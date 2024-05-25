import mongoose from "mongoose";

const ActorSchema = new mongoose.Schema(
  {
    actorName: {
      type: String,
      trim: true,
      required: true,
    },
    about: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      trim: true,
      required: true,
    },
    actorAvatar: {
      type: Object,
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

const Actor = mongoose.models.Actor || mongoose.Schema("Actor", ActorSchema);
