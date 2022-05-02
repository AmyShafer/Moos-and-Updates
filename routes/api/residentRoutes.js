const router = require('express').Router();
const {
    getResidents,
    getSingleResident,
    createResident,
    deleteResident,
    addThought,
    removeThought,
    addFriend,
    removeFriend
} = require('../../controllers/residentController');

// /api/residents
router.route('/').get(getResidents).post(createResident);

// /api//residents/:residentId
router.route('/:residentId').get(getSingleResident).delete(deleteResident);

// /api//residents/:residentId/thoughts
router.route('/:residentId/thoughts').post(addThought);

// /api/residents/:residentId/thoughts/:thoughtId
router.route('/:residentId/thoughts/:thoughtId').delete(removeThought);

// /api/users/:userId/friends/:friendId
router.route('/:residentId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;