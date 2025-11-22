import mongoose from "mongoose";

const StockAdjustmentSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },

    countedQty: { type: Number, required: true },
    systemQty: { type: Number, required: true },
    difference: { type: Number, required: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    validatedAt: { type: Date },
    note: { type: String }
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("StockAdjustment", StockAdjustmentSchema);
