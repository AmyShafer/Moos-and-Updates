const {
    Schema,
    model,
    Types
} = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    residentName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    toJSON: {
        getters: true
    },
    id: false
});

module.exports = reactionSchema;