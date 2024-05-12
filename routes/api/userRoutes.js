const router = require('express').Router();
const { User } = require('../../models');

// GET all users
router.get('/all-users', async (req, res) => {
    try {
        const users = await User.find({}).populate('thoughts').populate('friends');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `Unable to obtain all users. Error: ${error}`});
    }
});

// GET a single user by its _id and populated thought and friend data
router.get('/one-user/:id', async (req, res) => {
    try {
        const user = await User.find({username: req.params.id}).populate('thoughts').populate('friends');
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `Unable to obtain user info. Error: ${error}`});
    }
});

// POST a new user
router.post('/create', async (req, res) => {
    try {
        console.log(req.body);
        const newUser = await User.create({username: req.body.username, email: req.body.email, thoughts: req.body.thoughts, friends: req.body.friends});
        res.status(200).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `Unable add a new user. Error: ${error}`});
    }
});

// PUT (update) a user by its _id
router.put('/update/:id', async (req, res) => {
    try {
        // update user by id
        console.log(req.body);
        const query = {username: req.params.id};
        const updateUser = await User.findOneAndUpdate(query, { $set: {username: req.body.username, email: req.body.email}}, { new: true, runValidators: true });
        res.status(200).json(updateUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `Unable to update user. Error: ${error}`});
    }
});

// DELETE a user by its _id
router.delete('/delete/:id', async (req, res) => {
    try {
        await User.deleteOne({username: req.params.id});
        res.status(200).json({message: `The following user was deleted: ${req.params.id}`});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: `Unable to delete user. Error: ${error}`});
    }
});

// POST to add a new friend to a users friend list
router.post('/add-friend', async (req, res) => {
    const userId = req.body.userId;
    const friendId = req.body.friendId;

    try {
        // Find user and add friend ID to the friends array if not already included
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { new: true, runValidators: true }
        );

        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Unable to add friend to friends list. Error: ${error}` });
    }
});

// DELETE to remove a friend from a user's friend list
router.delete('/remove-friend', async (req, res) => {
    const userId = req.body.userId;
    const friendId = req.body.friendId;

    try {
        // Find user and remove friend ID from the friends array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { new: true, runValidators: true }
        );

        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Unable to remove friend from friends list. Error: ${error}` });
    }
});

module.exports = router;