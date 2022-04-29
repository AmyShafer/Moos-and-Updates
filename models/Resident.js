const {
    Schema,
    model
} = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create Student model
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
    friendCount: friends.length + 1;
}, {
    toJSON: {
        getters: true,
    }
});

const Resident = model('Resident', residentSchema);

module.exports = Resident;