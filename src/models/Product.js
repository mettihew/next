// models/Product.ts
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },

    category: { type: String },
    subCategory: { type: String },

    discount: { type: Number },
    sold: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },

    description: { type: String },
    specifications: { type: Object },

    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    productImages: [{ type: String }],
    userImages: [{ type: String }],
    bannerImage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
