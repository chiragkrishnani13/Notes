
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("object")
    console.error(error.message);
  }
}
module.exports = connectDB