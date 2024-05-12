const router = require('express').Router();
const { Thought, User } = require('../../models');

// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.status(200).json(thoughts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to fetch thoughts." });
    }
});

// GET a single thought by _id
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: "No thought found with this ID." });
        }
        res.json(thought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to fetch thought." });
    }
});

// POST to create a thought, and add created thought _id to associated user's thoughts array
router.post('/', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const userUpdate = await User.findByIdAndUpdate(
            req.body.username,
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        res.status(201).json(thought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to create thought." });
    }
});

// PUT (update) a thought by _id
router.put('/:id', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedThought) {
            return res.status(404).json({ message: "No thought found with this ID." });
        }
        res.json(updatedThought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to update thought." });
    }
});


// DELETE a thought by _id
router.delete('/:id', async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        if (!deletedThought) {
            return res.status(404).json({ message: "No thought found with this ID." });
        }
        await User.findByIdAndUpdate(
            deletedThought.username, // Assuming the thought model stores a reference to the user
            { $pull: { thoughts: req.params.id } }
        );
        res.json({ message: "Thought deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to delete thought." });
    }
});

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:id/reactions', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.id,
            { $push: { reactions: req.body } },
            { new: true }
        );
        if (!updatedThought) {
            return res.status(404).json({ message: "No thought found to add reaction." });
        }
        res.json(updatedThought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to add reaction." });
    }
});


// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:id/reactions/:reactionId', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.id,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (!updatedThought) {
            return res.status(404).json({ message: "No thought found or reaction to remove." });
        }
        res.json(updatedThought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to remove reaction." });
    }
});

module.exports = router;
