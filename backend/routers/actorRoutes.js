import { Router } from "express";
import { createActor } from "../controllers/actorControllers.js";
import uploadImage from "../middleware/actorUpload.js";
import { actorInfoValidator, validate } from "../middleware/Validator.js";

const actorRouter = Router();

actorRouter.post(
  "/create-actor",
  actorInfoValidator,
  validate,
  uploadImage.single("avatar"),
  createActor
);

export default actorRouter;
