const User = require('../models/User');
const Thought = require('../models/Thought');

const userController = {
  // GET all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
  },

  // GET a single user by id
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('thoughts');
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id! Oh No!' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
  },

  // POST a new user
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json({ message: 'Error creating user', error: err.message });
    }
  },

  // PUT to update a user by id
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: 'Error updating user', error: err.message });
    }
  },

// DELETE a user and their associated thoughts
deleteUser: async (req, res) => {
    try {
      // First, get the user's thoughts before deletion
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
  
      // Delete the user's thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
  
      // Now, delete the user
      await User.findByIdAndDelete(req.params.id);
  
      res.json({ message: 'User and their thoughts have been deleted from all reality' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
  },
  

  // Add a Friend
  addFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } }, 
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error adding friend', error: err.message });
    }
  },
  
  // Remove a Friend
  removeFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error removing friend', error: err.message });
    }
  },
  

};

module.exports = userController;
