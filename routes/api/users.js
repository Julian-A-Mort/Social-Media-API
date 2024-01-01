const express = require('express');
const router = express.Router();
const { UserController } = require('../../controllers');

// GET all users
router.get('/users', UserController.getAllUsers);

// GET a single user by _id
router.get('/users/:id', UserController.getUserById);

// POST a new user
router.post('/users', UserController.createUser);

// PUT to update a user by _id
router.put('/users/:id', UserController.updateUser);

// DELETE to remove user by _id
router.delete('/users/:id', UserController.deleteUser);

// POST to add a new friend to a user's friend list
router.post('/users/:userId/friends/:friendId', UserController.addFriend);

// DELETE to remove a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', UserController.removeFriend);

module.exports = router;
