import mongoose, { Schema, Document } from "mongoose";
import User from "@/models/User";

export interface IReview extends Document {
  productId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
}

const reviewSchema = new Schema<IReview>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: User, // 👈 must match your model name
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.Review ||
  mongoose.model<IReview>("Review", reviewSchema);
