// Import all the modules
import dotenv from "dotenv/config";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./util/database.js";
import authRouter from "./routers/authRoutes.js";
const app = express();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/api/user", authRouter);

const connect = async () => {
  try {
    await connectDB(uri);
    app.listen(port, () => {
      console.log(`Server is working on the port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connect();
