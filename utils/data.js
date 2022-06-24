const names = [
    "Colin",
    "Woody",
    "Jo",
    "Johnny",
    "Maribeth",
    "Maybelle",
    "Juniper",
    "Mikey",
    "Maximus",
    "Judy",
    "Penny",
    "Stanley",
    "Olive",
    "Amelia",
    "Antonio",
    "Curly",
    "Momma",
    "Ari",
    "Hurley",
    "Marsha",
    "Leroy",
    "Oscar",
    "Dino",
    "Lola",
    "Bosley",
    "Charlie",
    "Molly",
    "Bunny"
]

const animals = [
    "cow",
    "pig",
    "goat",
    "chicken",
    "turkey",
    "bunny",
    "duck",
    "geese",
    "dog",
    "cat"
];

const thoughts = [
    "The pasture is breeze couldn\'t be more perfect",
    "Moo!",
    "This hay hits the spot!",
    "Rain\'s coming! Let me lay down.",
    "I like this person...I think I\'ll try for a neck scratch!",
    "That\'s the spot! Keep scratching!",
    "What a day to be alive!",
    "Treats! I love treats!",
    "This is some high quality grass right here!",
    "Mud, mud! I love mud!",
    "Human, rub my belly!",
    "What\'s this?",
    "Time to clean my pen!",
    "Snow\'s back!",
    "Fresh fruit, hooray!",
    "This person is my new favorite person!",
    "Someone new is here!"
];

// get a random element given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Get a random user name
const getUserName = () => {
    let userName = getRandomArrItem(names);
    let index = names.indexOf(userName);
    names.splice(index, 1);
    `${userName}`;
};

// Get email
const getEmail = () => {
    let randArrItem = getRandomArrItem(animals);
    let index = animals.indexOf(randArrItem);
    animals.splice(index, 1);
    return `${getRandomArrItem(animals)}@woodstock.org`
};

// Get thoughts
const getThoughts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            newThought: getRandomArrItem(thoughts)
        });
    }
    return results;
};

// Get friends
const getFriends = (names) => {
    let friends = [];
    const numOfFriends = getRandomArrItem(names);

    for (let i = 0; i < numOfFriends; i++) {
        const currentFriend = getRandomArrItem(names);
        friends.push(currentFriend);
    }

    return friends;
};

// export the function for use in seed.js
module.exports = {
    getUserName,
    getEmail,
    getThoughts,
    getFriends
};