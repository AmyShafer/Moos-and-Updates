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
    "cat",
    "llama",
    "sheep",
    "horse"
];

const thoughts = [
    "The pasture is breeze couldn\'t be more perfect",
    "I think I will head down to the woods.",
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
    "Someone new is here!",
    "What is that? Time to investigate!",
    "I think I will go for a nap...",
    "Thank goodness for the fresh water!",
    "Who is this now?",
    "Sorry, I need some down time at the moment.",
    "Better go check out the barn. I hear there's a new resident there.",
    "The humans are playing music for us today!"
];

// get a random element given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Get a random Resident name
const getResidentName = () => {
    let residentName = getRandomArrItem(names);
    let index = names.indexOf(residentName);
    names.splice(index, 1);
    return `${residentName}`;
};

// Get email
const getEmail = () => {
    let randArrItem = getRandomArrItem(animals);
    let index = animals.indexOf(randArrItem);
    animals.splice(index, 1);
    return `${randArrItem}@woodstock.org`;
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

// Get thoughts
const getThoughts = () => {
    let freshThought = getRandomArrItem(thoughts);
    return freshThought;
};

// export the function for use in seed.js
module.exports = {
    getResidentName,
    getEmail,
    getThoughts,
    getFriends
};