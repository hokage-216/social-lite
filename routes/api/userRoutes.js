const router = require('express').Router();
const { Thought, User } = require('../../models');

// GET all users
router.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find(); 
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `Unable to obtain all users. Error: ${error}`});
    }
});

// GET a single user by its _id and populated thought and friend data
router.get('/getUser/:id', async (req, res) => {
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Unable to obtain user info."});
    }
});

// POST a new user

// PUT (update) a user by its _id

// DELETE a user by its _id

// POST to add a new friend to a users friend list

// DELETE to remove a friend from a user's friend list

module.exports = router;