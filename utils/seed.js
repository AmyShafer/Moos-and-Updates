const connection = require('../config/connection');
const {
    Resident,
    Thought,
    Reaction
} = require('../models');
const {
    getResidentName,
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

    // create empty array to hold residents
    // const residentThoughts = getThoughts(5);

    // loop 10 times to add residents to the residents array
    for (let i = 0; i < 10; i++) {
        const residentName = getResidentName();
        const email = getEmail();
        // // create thoughts
        const residentThoughts = getThoughts(5);

        residents.push({
            residentName,
            email,
            residentThoughts,
            //friends,
        });
    }

    // add residents to the collection and await the results
    await Resident.collection.insertMany(residents);

    // // add thoughts to the collection and await the results
    await Thought.collection.insertOne({
        test: 'test',
        residents: [...residents]
    });

    // log out the seed data to indicate what should appear in the database
    console.table(residents);
    console.info('The barn doors are open! 🐮');
    process.exit(0);
});