import mongoose from "mongoose";
import bcrypt from "bcrypt";

const emailVerificationSchema = mongoose.Schema({
  emailOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

emailVerificationSchema.pre("save", async function (next) {
  const emailVerificationToken = this;
  try {
    if (emailVerificationToken.isModified("token")) {
      const hashOtp = await bcrypt.hash(emailVerificationToken.token, 10);
      emailVerificationToken.token = hashOtp;
    }
    next();
  } catch (error) {
    console.log(error);
  }
});

//Additional method on emailVerificationSchema
emailVerificationSchema.methods.compareToken = async function (token) {
  const emailVerificationToken = this;
  try {
    const isMatched = await bcrypt.compare(token, emailVerificationToken.token);
    return isMatched;
  } catch (error) {
    console.log(error);
  }
};

const EmailVerification = mongoose.model(
  "EmailVerification",
  emailVerificationSchema
);

export default EmailVerification;
