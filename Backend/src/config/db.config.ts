import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.DATABASE_URI;
    if (!mongoUri) {
      throw new Error("DATABASE_URI is not defined");
    }
    
    await mongoose.connect(mongoUri as string);
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database:", error);
    process.exit(1);
  }
};
