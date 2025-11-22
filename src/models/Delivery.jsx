import mongoose from "mongoose";

const DeliveryOrderSchema = new mongoose.Schema({
    documentNumber: { type: String, required: true },
    customerName: { type: String },
    warehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },

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
export default mongoose.model("DeliveryOrder", DeliveryOrderSchema);
