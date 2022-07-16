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
            .select('-__v')
            .then((thoughtData) => {
                !thoughtData ?
                    res.status(404).json({
                        message: "No thoughts here with that ID. Go-at Figure. Sorry, please don't leave! There are so many good animals puns!"
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
                        message: "Thought created but there was not a resident with that id, That will cost you an extra carrot."
                    }) :
                    res.json({
                        message: "Thought created! That can fun. Now it is time for a nap."
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
                        message: "No thought with that ID here. Maybe ask a human to help you. You are a human? Well, maybe take a sun break. That always helps me find my thoughts."
                    }) :
                    res.json({
                        message: "Thought deleted! We fed it to the pigs!"
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
                    message: "No thought with that ID here! Too baaaaa-d!"
                }) :
                res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
    // add reaction to a thought
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
                    res.status(404)
                    .json({
                        message: "Reaction created but found no thought with this id. A belly run would be very appreciated for the extra effort on my part."
                    }) :
                    res.json({
                        message: "Reaction added. The barn will be so pleased!"
                    });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
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
            .then((thoughtData) =>
                !thoughtData ?
                res.status(404).json({
                    message: "No reaction with this id. Have you checked the pasture?"
                }) :
                res.json({
                    message: "This reaction has been eaten! This is what happens when you rescue goats!"
                })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};

module.exports = thoughtController;