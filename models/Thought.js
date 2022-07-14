const {
    Schema,
    model
} = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Thought Model
const thoughtSchema = new Schema({
    residentThoughts: {
        type: String,
        required: 'What ever could be on your mind?',
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
    residentName: {
        type: String,
        required: true
    },
    // Array of nested documents created with the reactionSchema
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    })
    // Setter to set the reaction count
    .set(function () {
        let reactionCount = this.reactionCount.length;
    })

// Initialize the Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;