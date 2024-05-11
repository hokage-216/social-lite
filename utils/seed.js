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
        { username: 'user5', email: 'user5@example.com' }
    ];

    // Add users to the collection and await the results
    const userData = await User.insertMany(users);
    console.log('Users inserted:', userData);

     // Create thoughts array
     const thoughts = [
        {
            thoughtText: "I love this new app!",
            createdAt: Date.now(),
            username: userData.find(u => u.username === 'user1')._id,
            reactions: []
        },
        {
            thoughtText: "I love the smell of pie!",
            createdAt: Date.now(),
            username: userData.find(u => u.username === 'user2')._id,
            reactions: []
        },
        
    ];

    // Add thoughts to the collection and await the results
    const thoughtData = await Thought.insertMany(thoughts);
    console.log('Thoughts inserted:', thoughtData);

    // Create initial reactions
    const reactions_1 = [
        {
            reactionBody: "That's fantastic!",
            username: userData.find(u => u.username === 'user2')._id,
            createdAt: new Date()
        },
        {
            reactionBody: "Awesome post!",
            username: userData.find(u => u.username === 'user3')._id,
            createdAt: new Date()
        },
        {
            reactionBody: "I'm with you on that one!",
            username: userData.find(u => u.username === 'user4')._id,
            createdAt: new Date()
        }
    ];

    const reactions_2 = [
        {
            reactionBody: "That's fantastic!",
            username: userData.find(u => u.username === 'user3')._id,
            createdAt: new Date()
        },
        {
            reactionBody: "Awesome post!",
            username: userData.find(u => u.username === 'user4')._id,
            createdAt: new Date()
        },
        {
            reactionBody: "I'm with you on that one!",
            username: userData.find(u => u.username === 'user5')._id,
            createdAt: new Date()
        }
    ];

    // Update thoughts with reactions
    await Thought.findByIdAndUpdate(thoughtData[0]._id, { $push: { reactions: { $each: reactions_1 } } });
    await Thought.findByIdAndUpdate(thoughtData[1]._id, { $push: { reactions: { $each: reactions_2 } } });

    console.info('Seeding complete! 🌱');
    process.exit(0);
});