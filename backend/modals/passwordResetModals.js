import mongoose from "mongoose";
import bcrypt from "bcrypt";

const passwordResetSchema = new mongoose.Schema({
  emailOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, expires: 900, default: Date.now() },
});

const PasswordReset =
  mongoose.models.PasswordReset ||
  mongoose.model("PasswordReset", passwordResetSchema);

export default PasswordReset;
