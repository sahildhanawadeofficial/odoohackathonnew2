import mongoose from "mongoose";

const StockLedgerSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },

    qtyChange: { type: Number, required: true },

    reason: {
        type: String,
        required: true,
        enum: ["receipt", "delivery", "transfer", "adjustment"]
    },

    refDocument: { type: mongoose.Schema.Types.ObjectId },

    createdAt: { type: Date, default: Date.now }
});

mongoose.models = {};
export default mongoose.model("StockLedger", StockLedgerSchema);
