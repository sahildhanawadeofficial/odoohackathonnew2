import mongoose from "mongoose";

const ProductCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("ProductCategory", ProductCategorySchema);
