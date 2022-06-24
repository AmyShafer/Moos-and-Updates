const router = require('express').Router();
const {
    getResidents,
    getSingleResident,
    createResident,
    deleteResident,
    addFriend,
    removeFriend
} = require('../../controllers/residentController');

// /api/residents
router.route('/').get(getResidents).post(createResident);

// /api/residents/:residentId
router.route('/:residentId').get(getSingleResident).delete(deleteResident);

// /api/residentId/:friends/:friendId
router.route('/:residentId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;