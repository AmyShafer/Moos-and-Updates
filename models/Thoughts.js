const {
    Schema,
    model
} = require('mongoose');
const Thought = require('./Thought')

// Schema to create Post Model
const thoughtSchema = new Schema({
    thoughtId: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        // Date
        type: Date,
        // Set default value to the current timestamp
        default: Date.now,
        // Use a getter method to format the timestamp on query
    },
    username: {
        type: String,
        required: true
    },
    // Array of nested documents created with the reactionSchema
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Resident'
    }, ]
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});