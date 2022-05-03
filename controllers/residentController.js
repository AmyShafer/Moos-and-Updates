const {
    Resident,
    Thought
} = require('../models');
const {
    getUserName
} = require('../utils/data');

const residentController = {
    // Get all residents
    getResidents(req, res) {
        Resident.find()
            .select('-__v')
            .then(residentData => {
                res.json(residentData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Get a single resident
    getSingleResident(req, res) {
        Resident.findOne({
                _id: req.params.residentId
            })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((residentData) => {
                !resident ?
                    res.status(404).json({
                        message: "No resident with that ID"
                    }) :
                    res.json(residentData)
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create a new resident
    createResident(req, res) {
        Resident.create(req.body)
            .then((residentData) => res.json(residentData))
            .catch((err) => res.status(500).json(err));
    },
    // Delete a resident 
    deleteResident(req, res) {
        Resident.findOneAndDelete({
                _id: req.params.residentId
            })
            .then((residentData) =>
                !residentData ?
                res.status(404).json({
                    message: 'No such resident exists'
                }) :
                res.json(residentData)
            )
        // delete thoughts
        Thought.deleteMany({
                _id: {
                    $in: 'No resident with this id!'
                }
            })
            .then(() => {
                res.json({
                    message: 'Resident and their thoughts have been deleted!'
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Add a friend
    addFriend(req, res) {
        Resident.findOneAndUpdate({
                _id: req.params.userId
            }, {
                $addToSet: {
                    friends: req.params.friendId
                }
            }, {
                new: true
            })
            .then((residentData) => {
                !residentData ?
                    res.status(404).json({
                        message: 'No resident with this id!'
                    }) :
                    res.json(residentData)
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json(err);
                    });
            }, )
    },
    // Remove a friend
    removeFriend(req, res) {
        Resident.findOneAndUpdate({
                _id: req.params.residentId
            }, {
                $pull: {
                    thought: {
                        thoughtId: req.params.thoughtId
                    }
                }
            }, {
                runValidators: true,
                new: true
            })
            .then((residentData) =>
                !residentData ?
                res
                .status(404)
                .json({
                    message: 'No resident found with that ID.'
                }) :
                res.json(residentData)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // add friend from resident
    addFriend(req, res) {
        Resident.create(req.body)
            .then((friend) => {
                return Resident.findOneAndUpdate({
                    _id: req.body.residentId
                }, {
                    $addToSet: {
                        friends: friend._id
                    }
                }, );
            })
            .then((friend) =>
                !friend ?
                res.status(404).json({
                    message: 'Friend added, but found no resident with that ID',
                }) :
                res.json('Friend added!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // remove friend from resident
    removeFriend(req, res) {
        Resident.findOneAndRemove({
                _id: req.params.friendId
            })
            .then((friend) =>
                !friend ?
                res.status(404).json({
                    message: 'No friend with this id!'
                }) :
                Resident.findOneAndUpdate({
                    videos: req.params.friendId
                }, {
                    $pull: {
                        friends: req.params.friendId
                    }
                }, {
                    new: true
                })
            )
            .then((friend) =>
                !friend ?
                res
                .status(404)
                .json({
                    message: 'Friend added but no resident with this id!'
                }) :
                res.json({
                    message: 'Friend added!'
                })
            )
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = residentController;