const {
    Schema,
    Types
} = require('mongoose');
//const date 

const reactionSchema = new Schema({
    reactionId: {
        // Use Mongoose's ObjectId data type
        type: Schema.Types.ObjectId,
        // Default value is set to a new ObjectId
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        // String
        type: String,
        // Required
        required: true,
        // 280 character maximum
        maxLength: 280,
    },
    username: {
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

// Schema Settings:
// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.