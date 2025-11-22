import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: { type: [String] },
    unit: { type: String, required: true },
    description: { type: String },
    userEmail: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("Product", ProductSchema);
