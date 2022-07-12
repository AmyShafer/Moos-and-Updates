const {
    Schema,
    model
} = require('mongoose');

const reactionSchema = new Schema({
    text: String
});

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;