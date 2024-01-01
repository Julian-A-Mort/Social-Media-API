const express = require('express');
const router = express.Router();
const { ThoughtController } = require('../../controllers/index');

// GET all thoughts
router.get('/thoughts', ThoughtController.getAllThoughts);

// GET a single thought by its _id
router.get('/thoughts/:id', ThoughtController.getThoughtById);

// POST to create a new thought
router.post('/thoughts', ThoughtController.createThought);

// PUT to update thought by its _id
router.put('/thoughts/:id', ThoughtController.updateThought);

// DELETE to remove a thought by its _id
router.delete('/thoughts/:id', ThoughtController.deleteThought);

// POST to create a reaction
router.post('/thoughts/:thoughtId/reactions', ThoughtController.createReaction);

// DELETE to remove a reaction
router.delete('/thoughts/:thoughtId/reactions/:reactionId', ThoughtController.deleteReaction);

module.exports = router;
