const {
    Thought,
    Resident
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
            .then((thoughtData) =>
                !thoughtData ?
                res.status(404).json({
                    message: "No thoughts here with that ID"
                }) :
                res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => {
                return Resident.findOneAndUpdate({
                    _id: req.body.userId
                }, {
                    $push: {
                        thoughts: thoughtData._id
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
                        thoughts: req.params.thoughtId
                    }, {
                        $pull: {
                            thoughts: req.params.thoughtId
                        }
                    }, {
                        new: true
                    });
            })
            .then((residentData) => {
                !residentData ?
                    res.status(404).json({
                        message: "Thought created bu no residents with that ID"
                    }) :
                    res.json({
                        message: 'Thought deleted!'
                    })
                    .catch((err) => {
                        console(err);
                        res.status(500).json(err);
                    });
            }, )
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
    // add reaction to a though
    addReaction(req, res) {
        Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $addToSet: {
                    reactions: req.body
                }
            }, {
                runValidators: true,
                new: true
            })
            .then((thoughtData) => {
                !thoughtData ?
                    res.status(404).json({
                        message: 'No thought with this id!'
                    }) :
                    res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // remove reaction to a thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate({
                _id: req.params.thoughtId
            }, {
                $pull: {
                    reactions: {
                        reactionId: req.params.reactionId
                    }
                }
            }, {
                runValidators: true,
                new: true
            })
            .then((thoughtData => {
                    !thoughtData ?
                        res.status(404).json({
                            message: 'No thought with this id!'
                        }) :
                        res.json(thoughtData);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                })
            ),
    }
};

module.exports = thoughtController;