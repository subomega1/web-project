import mongoose from "mongoose";


const PerfumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        firstLayer: { type: String, required: true },
        secondLayer: { type: String, required: true },
        thirdLayer: { type: String, required: true },
        // this should be in the order model
        price: { type: Number, required: true },
        // this should have some fields inside
        packaging: { type: String, required: true },
    },
    { timestamps: true }
);


export default mongoose.model("Perfume", UserSchema);