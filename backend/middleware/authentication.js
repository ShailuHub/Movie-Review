import jwt from "jsonwebtoken";
import User from "../modals/userModals.js";
import { sendError } from "../util/index.js";

const authenticatedUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeToken = jwt.verify(token, process.env.JSON_WEB_SECRET_KEY);
    const user = await User.findOne({ _id: decodeToken._id });
    if (!user) sendError(res, 401, "Unauthorised user");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    sendError(res, 500, "Internal server error");
  }
};

export default authenticatedUser;
