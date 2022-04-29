const {
    Reaction,
    Resident,
    Thought
} = require('../models');

module.exports = {
    // Get all the thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a thought
    getSingleThought(req, res) {
        Thought.findOne({
                _id: req.params.thoughtId
            })
            .select('-__v')
            .then((thought) =>
                !thought ?
                res.status(404).json({
                    message: "No thoughts here with that ID"
                }) :
                res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    deleteThought(req, res) {
        Thought.findOnAndDelete({
                _id: req.params.thoughtId
            })
            .then((thought) =>
                !thought ?
                res.status(404).json({
                    message: "No thought with that ID here!"
                }) :
                Thought.deleteMany({
                    _id: {
                        $in: thought.residents
                    }
                })
            )
            .then(() => res.json({
                message: 'Thought and residents deleted!'
            }))
            .catch((err) => res.status(500).json(err));
    },
    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $set: req.body
            }, {
                runValidators: true,
                new: true
            })
            .then((thought) =>
                !thought ?
                res.status(404).json({
                    message: "No thought with that ID here!"
                }) :
                res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
};