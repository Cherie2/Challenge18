const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// Route to get all thoughts
router.route("/").get(getAllThoughts).post(createThought);

// Route to get a single thought and either update or delete it
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Route to post a reaction
router.route("/:thoughtId/reactions").post(addReaction);

// Route to delete reaction
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
