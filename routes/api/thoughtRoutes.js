const router = require('express').Router();
const {
    getThoughts,
    getSingleThoughts,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController.js');

// /api/courses
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
    .router('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .deleteThought;

module.exports = router;