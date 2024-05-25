// Import all the modules
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./util/database.js";
import authRouter from "./routers/authRoutes.js";
import cors from "cors";
import actorRouter from "./routers/actorRoutes.js";
const app = express();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/user", authRouter);
app.use("/api/actor", actorRouter);

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
