const {
    Schema,
    model
} = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create Resident model
const residentSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/.test(v);
            }
        },
    },
    thoughts: [thoughtSchema],
    friends: [ResidentSchema],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});

// Create a virtual property `friendCount` that retrieves the length of the user's friends array field on query.
residentSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return `${this.length + 1}`;
    })
    // Setter to set the friend count
    .set(function (v) {
        const friendCount = this.length + 1;
    });

// Initialize the Resident model
const Resident = model('Resident', residentSchema);

module.exports = Resident;