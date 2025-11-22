import mongoose from "mongoose";

const ReceiptSchema = new mongoose.Schema({
    documentNumber: { type: String, required: true },
    supplierName: { type: String },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },

    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, required: true }
        }
    ],

    status: {
        type: String,
        default: "draft" // draft/waiting/ready/done/canceled
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    validatedAt: { type: Date }
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("Receipt", ReceiptSchema);
