const {
    Resident,
    Thought
} = require('../models');

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
            // .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((residentData) => {
                !residentData ?
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
    // update a resident
    updateResident(req, res) {
        Resident.findOneAndUpdate({
                _id: req.params.residentId
            }, {
                $set: req.body

            }, {
                new: true
            })
            .then((residentData) => {
                !residentData ?
                    res.status(404).json({
                        message: 'No such resident exists'
                    }) :
                    res.json(residentData)
            })
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
                //     res.json(residentData)
                // )
                // delete thoughts
                Thought.deleteMany({
                    _id: {
                        $in: residentData.thoughts
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
                })
            )
    },
    // Add a friend
    addFriend(req, res) {
        Resident.findOneAndUpdate({
                _id: req.params.residentId
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
    }
};

module.exports = residentController;