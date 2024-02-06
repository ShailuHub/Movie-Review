import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// UserSchema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Mongoose middleware on userSchema
userSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (user.isModified("password")) {
      const hashPassword = await bcrypt.hash(user.password, 10);
      user.password = hashPassword;
      next();
    }
  } catch (error) {
    console.log(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
