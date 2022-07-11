const {
    Schema,
    Types,
    ObjectId
} = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        // Use Mongoose's ObjectId data type
        type: Schema.Types.ObjectId,
        // Default value is set to a new ObjectId
        default: () => new Types.ObjectId(),
    },
    reactions: [{
        // String
        type: Schema.Types.ObjectId,
        // Required
        ref: 'reaction',
    }, ],
    residentName: {
        // String
        type: String,
        // Required
        required: true,
    },
    createdAt: {
        // Date
        type: Date,
        // Set default value to the current timestamp
        default: Date.now,
        // Use a getter method to format the timestamp on query
    },
}, {
    toJSON: {
        getters: true
    },
    id: false,
});

module.exports = reactionSchema;