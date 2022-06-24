const {
    Schema,
    model
} = require('mongoose');

// Schema to create Resident model
const residentSchema = new Schema({
    residentName: {
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
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            }
        },
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }, ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Resident',
    }, ],
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
        return this.friends.length;
    })
    // Setter to set the friend count
    .set(function (v) {
        const friendCount = this.friends.length;
    });

// Initialize the Resident model
const Resident = model('Resident', residentSchema);

module.exports = Resident;