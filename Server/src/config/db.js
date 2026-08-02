import mongoose from 'mongoose';

/**
 * Connect to MongoDB instance using Mongoose
 */
export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb+srv://rumaishaqadeer_db_user:<1JQClr00ug8IwL6Z>@crackitdatabase.srbkfxk.mongodb.net/?appName=CrackitDatabase';
    const conn = await mongoose.connect(connStr);
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB] Connection Error: ${error.message}`);
    process.exit(1);
  }
};
