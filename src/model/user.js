import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
    },
    age: {
        type: Number,
    },
},
    { timestamps: true, versionKey: false },)

export default mongoose.model("User", userSchema);