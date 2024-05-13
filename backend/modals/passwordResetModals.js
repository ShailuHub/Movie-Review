import mongoose from "mongoose";
import bcrypt from "bcrypt";

const passwordResetSchema = new mongoose.Schema({
  emailOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, expires: 3600, default: Date.now() },
});

passwordResetSchema.pre("save", async function (next) {
  const passwordReset = this;
  try {
    if (passwordReset.isModified("token")) {
      const hashOtp = await bcrypt.hash(passwordReset.token, 10);
      PasswordReset.token = hashOtp;
      next();
    }
  } catch (error) {
    console.log(error);
  }
});

passwordResetSchema.methods.compareToken = async function (token) {
  const passwordReset = this;
  try {
    const isMatched = await bcrypt.compare(token, passwordReset.token);

    return isMatched;
  } catch (error) {
    console.log(error);
  }
};

const PasswordReset =
  mongoose.models.PasswordReset ||
  mongoose.model("PasswordReset", passwordResetSchema);

export default PasswordReset;
