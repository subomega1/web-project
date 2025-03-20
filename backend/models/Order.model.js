import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    perfume: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Perfume",
    },
    status:{
        type: String,
        required: true,
        enum: ["pending", "delivered", "cancelled"],
        default: "pending",
    },
    delivery_date: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model("Order", UserSchema);