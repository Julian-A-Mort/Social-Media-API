const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
  // GET all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching thoughts', error: err.message });
    }
  },

  // GET a single thought by id
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'No thoughts found with this id!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching thought', error: err.message });
    }
  },

  // POST to create a new thought
  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } });
      res.json(newThought);
    } catch (err) {
      res.status(500).json({ message: 'Error cannot think', error: err.message });
    }
  },

  // PUT to update a thought by id
  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json({ message: 'Error updating thought', error: err.message });
    }
  },

  // DELETE to remove a thought by id
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }

      // Remove thought from user's thoughts array
      await User.findByIdAndUpdate(thought.userId, { $pull: { thoughts: thought._id } });

      // Delete the thought
      await thought.remove();

      res.json({ message: 'Thought has been deleted.' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting thought', error: err.message });
    }
  },
};

module.exports = thoughtController;
