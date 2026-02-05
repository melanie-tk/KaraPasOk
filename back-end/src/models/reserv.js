import mongoose from "mongoose";

const reservSchema = new mongoose.Schema(
  {
    timestampStart: { type: Number, required: true },
    timestampEnd: { type: Number, required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  },
  { timestamps: true }
);

export const Reserv = mongoose.model("Reserv", reservSchema);