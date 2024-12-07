import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
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
        required: true,
      },
    ],
/** locales: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Local",
      },
    ], */
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Método estático para encriptar contraseñas
userSchema.statics.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Método estático para comparar contraseñas
userSchema.statics.comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

// Verifica si el modelo ya existe antes de definirlo
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;