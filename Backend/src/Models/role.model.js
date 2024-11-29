import mongoose from "mongoose";
import ROLES from "../Constants/roles.constants.js";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ROLES, // Asegura que los roles sean válidos
      required: true,
      unique: true, // Evita roles duplicados en la base de datos
    },
  },
  {
    versionKey: false,
    timestamps: true, // Agrega "createdAt" y "updatedAt"
  }
);

// Verifica si el modelo ya existe antes de definirlo
const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);

export default Role;