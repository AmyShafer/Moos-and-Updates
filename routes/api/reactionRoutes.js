 const router = require('express').Router();

const {
  getReactions,
  getSingleReaction,
  createReaction,
  updateReaction,
  deleteReaction
} = require('../../controllers/reactionRoute.js');

// /api/reaction
router.route('/').get(getReactions).post(createReaction);

// /api/reaction/:reactionId
router
  .route('/:reactionId')
  .get(getSingleReaction)
  .put(updateReaction)
  .delete(deleteReaction);

module.exports = router;