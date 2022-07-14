const {
    Thought,
    Resident,
    Reaction
} = require('../models');

const thoughtController = {
    // Get all the thoughts
    getThoughts(req, res) {
        Thought.find()
            .sort({
                createdAt: -1
            })
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
    // Get a thought
    getSingleThought(req, res) {
        Thought.findOne({
                _id: req.params.thoughtId
            })
            .select('-__v')
            .then((thoughtData) => {
                !thoughtData ?
                    res.status(404).json({
                        message: "No thoughts here with that ID"
                    }) :
                    res.json(thoughtData)
            })
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => {
                return Resident.findOneAndUpdate({
                    _id: req.params.residentId
                }, {
                    $push: {
                        residentThoughts: thoughtData._id
                    }
                }, {
                    new: true
                });
            })
            .then((residentData) => {
                !residentData ?
                    res.status(404).json({
                        message: 'Thought created but there is no resident with this id!'
                    }) :
                    res.json({
                        message: 'Thought created!'
                    });
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({
                _id: req.params.thoughtId
            })
            .then((thoughtData) => {
                !thoughtData ?
                    res.status(404).json({
                        message: "No thought with that ID here!"
                    }) :
                    res.json({
                        message: 'Thought deleted!'
                    }),

                    Resident.findOneAndUpdate({
                        residentThoughts: req.params.thoughtId
                    }, {
                        $pull: {
                            residentThoughts: req.params.thoughtId
                        }
                    }, {
                        new: true
                    });
            })

            .catch((err) => {
                console(err);
                res.status(500).json(err);
            });
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
            .then((thoughtData) =>
                !thoughtData ?
                res.status(404).json({
                    message: "No thought with that ID here!"
                }) :
                res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
    // add reaction to a thought
    addReaction(req, res) {
        Reaction.create(req.body)
            .then((reaction) => {
                return Thought.findOneAndUpdate({
                    _id: req.params.thoughtId
                }, {
                    $push: {
                        reactions: reaction._id
                    }
                }, );
            })
            .then((thoughtData) => {
                !thoughtData ?
                    res.status(404)
                    .json({
                        message: 'Reaction created but found no thought with this id!'
                    }) :
                    res.json({
                        message: 'Reaction added!'
                    });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // remove reaction to a thought
    removeReaction({
        params
    }, res) {
        Thought.findOneAndUpdate({
                _id: params.thoughtId
            }, {
                $pull: {
                    reactions: {
                        reactionId: params.reactionId
                    }
                }
            }, {
                new: true
            })
            .then((thoughtData) =>
                !thoughtData ?
                res.status(404).json({
                    message: 'No reaction with this id!'
                }) :
                res.json({
                    message: "This reaction has been eaten! This is what happens when you rescue goats!"
                })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};

module.exports = thoughtController;