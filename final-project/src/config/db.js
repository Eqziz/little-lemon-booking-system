const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eduportal_db';
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    isConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn(`[MongoDB] Notice: Running in Local In-Memory Storage Mode for demonstration (${err.message}).`);
    isConnected = false;
  }
};

module.exports = { connectDB, getIsConnected: () => isConnected };
