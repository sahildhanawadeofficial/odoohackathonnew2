import mongoose from "mongoose";

const StockItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    wareHouse: { type: [String], required: true }, quantity: { type: Number, default: 0 },
    reserved: { type: Number, default: 0 }
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("StockItem", StockItemSchema);
