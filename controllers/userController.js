const { User, Thought } = require("../models");

const userController = {
  // Gets all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        select: "-__v",
        path: "friends",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Gets one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        select: "-__v",
        path: "thoughts",
      })
      
      .select("-__v")
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Creates user
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.json(err));
  },

  // Updates a user by Id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },

  // Deletes user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        // BONUS: get ids of user's `thoughts` and delete them all, $in finds users thoughts
        return Thought.deleteMany({ _id: { $in: userData.thoughts } });
      })
      .then(() => {
        res.json({ message: "User and their thoughts deleted successfully!" });
      })
      .catch((err) => res.json(err));
  },

  // Adds a friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user with this id!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },

  // Deletes a friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
