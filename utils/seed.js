const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected to socialDB');
    // Drop collections if they exist
    await User.collection.drop().catch(err => console.log('User collection not found, skipping drop.'));
    await Thought.collection.drop().catch(err => console.log('Thought collection not found, skipping drop.'));

    // Create array of users
    const users = [ 
        { username: 'user1', email: 'user1@example.com' },
        { username: 'user2', email: 'user2@example.com' },
        { username: 'user3', email: 'user3@example.com' },
        { username: 'user4', email: 'user4@example.com' },
        { username: 'user5', email: 'user5@example.com' },
        { username: 'user6', email: 'user6@example.com' },
        { username: 'user7', email: 'user7@example.com' },
        { username: 'user8', email: 'user8@example.com' },
        { username: 'user9', email: 'user9@example.com' },
        { username: 'user10', email: 'user10@example.com' }
    ];

    // Add users to the collection and await the results
    const userData = await User.insertMany(users);
    console.log('Users inserted:', userData);

    // Create initial reactions
    const reactions_1 = [
        {
            reactionBody: "That's fantastic!",
            username: 'user2',
            createdAt: new Date()
        },
        {
            reactionBody: "Awesome post!",
            username: 'user3',
            createdAt: new Date()
        },
        {
            reactionBody: "I'm with you on that one!",
            username: 'user4',
            createdAt: new Date()
        }
    ];

    const reactions_2 = [
        {
            reactionBody: "That's fantastic!",
            username: 'user2',
            createdAt: new Date()
        },
        {
            reactionBody: "Awesome post!",
            username: 'user3',
            createdAt: new Date()
        },
        {
            reactionBody: "I'm with you on that one!",
            username: 'user4',
            createdAt: new Date()
        }
    ];

     // Create thoughts array
     const thoughts = [
        {
            thoughtText: "I love this new app!",
            createdAt: Date.now(),
            username: 'user1',
            reactions: [reactions_1]
        },
        {
            thoughtText: "I love the smell of pie!",
            createdAt: Date.now(),
            username: 'user1',
            reactions: [reactions_2]
        },
        
    ];

    thoughts.forEach(thought => {
        const user = userData.find(u => u.username === thought.username);
        if (!user) {
            console.error(`No user found for thought by username: ${thought.username}`);
            return; // Skip this thought if no user found
        }
        thought.username = user._id; // Convert username to user _id
    
        thought.reactions.forEach(reaction => {
            const userForReaction = userData.find(u => u.username === reaction.username);
            if (!userForReaction) {
                console.error(`No user found for reaction by username: ${reaction.username}`);
                return; // Skip this reaction if no user found
            }
            reaction.username = userForReaction._id; // Convert username to user _id
        });
    });

    // Add thoughts to the collection and await the results
    const thoughtData = await Thought.insertMany(thoughts);
    console.log('Thoughts inserted:', thoughtData);

    console.info('Seeding complete! 🌱');
    process.exit(0);
});