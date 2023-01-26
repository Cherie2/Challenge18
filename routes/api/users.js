const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// Route to get all users
router.route("/").get(getAllUsers).post(createUser);

// Route to get a single user and either update or delete user
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// Route to add or delete friends
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
