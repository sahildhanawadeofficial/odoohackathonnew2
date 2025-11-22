import mongoose from "mongoose";

const WarehouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    address: { type: String },
    type: { type: String, default: "warehouse" }  // warehouse | internal
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("Warehouse", WarehouseSchema);
