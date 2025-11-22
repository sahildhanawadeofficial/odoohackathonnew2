import mongoose from "mongoose";

const InternalTransferSchema = new mongoose.Schema({
    documentNumber: { type: String, required: true },

    fromWarehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },
    toWarehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },

    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, required: true }
        }
    ],

    status: {
        type: String,
        default: "draft"
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    validatedAt: { type: Date }
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("InternalTransfer", InternalTransferSchema);
