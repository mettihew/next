import mongoose, { Schema } from 'mongoose';

// Separate review schema for clarity
const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

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

    brand: { type: String },
    description: { type: String },
    specifications: { type: Object },

    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String }
      }
    ],
  reviews: [reviewSchema],
  rating: { type: Number, default: 0 },
  banner: { type: String, required: true },
  numReviews: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Product || mongoose.model('Product', productSchema);