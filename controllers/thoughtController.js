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
      // First, find the thought to get the userId
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
  
      // Remove thought from user's thoughts array
      await User.findByIdAndUpdate(thought.userId, { $pull: { thoughts: thought._id } });
  
      // delete the thought
      await Thought.findByIdAndDelete(req.params.id);
  
      res.json({ message: 'Thought has been deleted.' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting thought', error: err.message });
    }
  },
  

  // Create REACTION
  createReaction: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: req.body } }, 
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Error creating reaction', error: err.message });
    }
  },  
  
  // Delete REACTION
  deleteReaction: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json({ message: 'Error deleting reaction', error: err.message });
    }
  },  

};

module.exports = thoughtController;
