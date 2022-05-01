const {
    ObjectId
} = require('mongoose').Types;
const {
    Resident,
    Thought,
    Reaction
} = require('../models');

const friendCount = async () =>
    friendCount.aggregate()
    .count('totalFriends')
    .then((numOfFriends) => numOfFriends);

const

    module.exports = {
        // Get all residents
        getResidents(req, res) {
            Resident.find()
                .then(async (residents) => {
                    const residentObj = {
                        residents,
                        headCount: await headCount(),
                    };
                    return res.json(residentObj);
                });
        },
        // Get a single resident
        getSingleResident(req, res) {
            Resident.findOne({
                    _id: req.params.residentId
                })
                .select('-__v')
                .lean()
                .then(async (resident) =>
                    !resident ?
                    res.status(404).json({
                        message: "No resident with that ID"
                    }) :
                    res.json({
                        resident,
                        thought: await thought(req.params.residentId),
                    }))
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json(err);
                });
        },
        // create a new resident
        createResident(req, res) {
            Resident.create(req.body)
                .then((resident) => res.json(resident))
                .catch((err) => res.status(500).json(err));
        },
        // Delete a resident a remove them from barn
        deleteResident(req, res) {
            Resident.findOneAndRemove({
                    _id: req.params.residentId
                })
                .then((resident) =>
                    !resident ?
                    res.status(404).json({
                        message: 'No such resident exists'
                    }) :
                    Resident.findOneAndUpdate({
                        residents: req.params.residentId
                    }, {
                        $pull: {
                            residents: req.params.residentId
                        }
                    }, {
                        new: true
                    })
                )
                .then((thought) =>
                    !thought ?
                    res.status(404).json({
                        message: 'Resident deleted, but not thoughts found'
                    }) :
                    res.json({
                        message: 'Resident successfully deleted'
                    })
                )
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
        },

        // Add a thought to a resident
        addThought(req, res) {
            console.log('You are adding a thought');
            console.log(req.body);
            Resident.findOneAndUpdate({
                    _id: req.params.residentId
                }, {
                    $addToSet: {
                        assignments: req.body
                    }
                }, {
                    runValidators: true,
                    new: true
                })
                .then((resident) =>
                    !resident ?
                    res
                    .status(404)
                    .json({
                        message: 'No resident found with that ID'
                    }) :
                    res.json(resident)
                )
                .catch((err) => res.status(500).json(err));
        },
        // Remove thought from a resident
        removeThought(req, res) {
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
                .then((resident) =>
                    !resident ?
                    res
                    .status(404)
                    .json({
                        message: 'No resident found with that ID.'
                    }) :
                    res.json(resident)
                )
                .catch((err) => res.status(500).json(err));
        },
    };