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
    const reactions = [
        {
            reactionBody: "That's fantastic!",
            username: 'user2',
            createdAt: new Date()
        },
        {
            reactionBody: "Really cool!",
            username: 'user1',
            createdAt: new Date()
        }
    ];

     // Create thoughts array
     const thoughts = [
        {
            thoughtText: "I love this new app!",
            createdAt: Date.now(),
            username: 'user1',
            reactions: [reactions]
        }
    ];

    thoughts.forEach(thought => {
        const user = userData.find(u => u.username === thought.username);
        thought.username = user._id;  // Assuming username should be a user ID reference
        thought.reactions.forEach(reaction => {
            const userForReaction = userData.find(u => u.username === reaction.username);
            reaction.username = userForReaction._id;
        });
    });

    // Add thoughts to the collection and await the results
    const thoughtData = await Thought.insertMany(thoughts);
    console.log('Thoughts inserted:', thoughtData);

    console.info('Seeding complete! 🌱');
    process.exit(0);
});