import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        capacity: { type: Number, required: true },
        description: { type: String },
        pricePerDay: { type: Number, required: true }
    },
    { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);