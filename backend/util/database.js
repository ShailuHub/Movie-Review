import mongoose from "mongoose";

// Connect application with mongoDB using mongoose
const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to the database");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
