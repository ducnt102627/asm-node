import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,

        },
        discount: {
            type: Number,
            default: 0,

        }
    },
    { timestamps: true, versionKey: false }
)
export default mongoose.model("Product", productSchema)