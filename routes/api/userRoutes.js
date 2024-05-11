const router = require('express').Router();
const { Thought, User } = require('../../models');

// GET all users
router.get('/allUsers ', async (req, res) => {
    try {
        const users = await User.find({}); 
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `Unable to obtain all users. Error: ${error}`});
    }
});

// GET a single user by its _id and populated thought and friend data
router.get('/user/:id', async (req, res) => {
    try {
        //get a  single user by id
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `Unable to obtain user info. Error: ${error}`});
    }
});

// POST a new user
router.post('/user/:id', async (req, res) => {
    try {
        // Add new user
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `Unable add a new user. Error: ${error}`});
    }
});

// PUT (update) a user by its _id
router.put('/user/:id', async (req, res) => {
    try {
        // update user by id
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `Unable to update user. Error: ${error}`});
    }
});

// DELETE a user by its _id
router.delete('/user/:id', async (req, res) => {
    try {
        // delete user by id
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `Unable to delete user. Error: ${error}`});
    }
});

// POST to add a new friend to a users friend list
router.post('/addFriend/:id', async (req, res) => {
    try {
        // Add friend to specific friend list
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `Unable add friend to friends list. Error: ${error}`});
    }
});

// DELETE to remove a friend from a user's friend list
router.delete('/removeFriend/:id', async (req, res) => {
    try {
        // delete user from friends list
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `Unable to remove friend from friends list. Error: ${error}`});
    }
});

module.exports = router;