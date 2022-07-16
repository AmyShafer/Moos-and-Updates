const {
    Resident,
    Thought
} = require('../models');

const residentController = {
    // Get all residents
    getResidents(req, res) {
        Resident.find()
            .select('-__v')
            .then((residentData) => {
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
            .populate('residentThoughts')
            .then((residentData) => {
                !residentData ?
                    res.status(404).json({
                        message: "No resident with that ID. It would be-hoove you to check the ID again."
                    }) :
                    res.json(residentData);
            })
            .catch((err) => res.status(500).json(err));
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
                        message: "No such resident exists here. Maybe try Catskills Sanctuary."
                    }) :
                    res.json(residentData)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Delete a resident 
    deleteResident(req, res) {
        Resident.findOneAndDelete({
                _id: req.params.residentId
            })
            .then((residentData) =>
                !residentData ?
                res.status(404).json({
                    message: "No such resident exists. It is possible they were adopted."
                }) :
                //     res.json(residentData)
                // )
                // delete thoughts
                Thought.deleteMany({
                    _id: {
                        $in: residentData.residentThoughts
                    }
                })
                .then(() => {
                    res.json({
                        message: "Gone but not forgotten."
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
                        message: "No resident with this id. Can I interest you in sponsoring a duck?"
                    }) :
                    res.json({
                        message: "Friended!"
                    });
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Remove a friend
    removeFriend(req, res) {
        Resident.findOneAndUpdate({
                _id: req.params.residentId
            }, {
                $pull: {
                    friends: req.params.friendId

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
                    message: "No resident with this id. Have you checked out our merch store?"
                }) :
                res.json({
                    message: "Unfriended. That's too bad."
                }),
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    }
};

module.exports = residentController;