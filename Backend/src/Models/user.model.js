import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
    },
    rut: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    roles: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        },
    ],
    locales: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Local",
        },
    ],
    favoritos: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Local",
        },
    ],
},
    {
    versionKey: false,
    },
);

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

const User = mongoose.model("User", userSchema);

export default User;