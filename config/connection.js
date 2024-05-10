const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    const connect_uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/socialDB';
    try {
      await mongoose.connect(connect_uri);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('Database connection error:', err);
      process.exit(1);
    }
  }
  
module.exports = connectDB;