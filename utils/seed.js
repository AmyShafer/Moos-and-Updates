const connection = require('../config/connection');
const {
    Resident,
    Thought,
    Reaction
} = require('../models');
const {
    getUserName,
    getEmail,
    getThoughts,
    getFriends
} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // drop existing thoughts
    await Thought.deleteMany({});

    // drop existing residents
    await Resident.deleteMany({});

    // create empty array to hold residents
    const residents = [];

    // loop 10 times to add residents to the residents array
    for (let i = 0; i < 10; i++) {
        const userName = getUserName();
        const email = getEmail();
        const thoughts = getThoughts(10);
        //const friends = getFriends();

        residents.push({
            userName: userName,
            email: email,
            thoughts: thoughts,
            //friends,
        });
    }

    // add residents to the collection and await the results
    await Resident.collection.insertMany(residents);

    // add thoughts to the collection and await the results
    await Thought.collection.insertOne({
        thought: 'Woodstock is the best!',
        residents: [...residents],
    })

    // log out the seed data to indicate what should appear in the database
    console.table(residents);
    console.info('The barn doors are open! 🐮');
    process.exit(0);
});