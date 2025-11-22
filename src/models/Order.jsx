import mongoose from "mongoose"

export const OrderSchema = new mongoose.Schema({
    email: { type: String, required: [true, "User Logged in email problem"] },
    orderId: { type: String, required: [true, "orderId problem"] },
    razorpayPaymentId: { type: String },
    amount: { type: String, required: [true, "OrderSchema amout error"] },
    paymentInfo: { type: Object, default: {} },
    paymentStatus: { type: String, default: 'Initiated' },
    orderPlaced: { type: Boolean, default: false },
    planExpiry: { type: Date },

}, { timestamps: true })


// mongoose.models = {}
// export default mongoose.model("Order", OrderSchema)

export default mongoose.models.Order || mongoose.model("Order", OrderSchema, "orders");
