"use strict";
// Importa el modelo de datos 'Role'
import Role from "../models/role.model.js";
import User from "../models/user.model.js";

/**
 * Crea los roles por defecto en la base de datos.
 * @async
 * @function createRoles
 * @returns {Promise<void>}
 */
async function createRoles() {
  try {
    const count = await Role.countDocuments({ name: { $in: ["user", "admin", "encargado"] } });
    if (count >= 3) return;

    await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
      new Role({ name: "encargado" }).save(),
    ]);
    console.log("* => Roles creados exitosamente");
  } catch (error) {
    console.error("Error creando roles:", error);
  }
}

/**
 * Crea los usuarios por defecto en la base de datos.
 * @async
 * @function createUsers
 * @returns {Promise<void>}
 */
async function createUsers() {
  try {
    const count = await User.countDocuments({ email: { $in: ["user@email.com", "admin@email.com", "encargado@email.com"] } });
    if (count >= 3) return;

    const admin = await Role.findOne({ name: "admin" });
    const user = await Role.findOne({ name: "user" });
    const encargado = await Role.findOne({ name: "encargado" });

    await Promise.all([
      new User({
        username: "user",
        email: "user@email.com",
        password: await User.encryptPassword("user"),
        roles: [user._id],
      }).save(),
      new User({
        username: "admin",
        email: "admin@email.com",
        password: await User.encryptPassword("admin"),
        roles: [admin._id],
      }).save(),
      new User({
        username: "encargado",
        email: "encargado@email.com",
        password: await User.encryptPassword("encargado"),
        roles: [encargado._id],
      }).save(),
    ]);
    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error creando usuarios:", error);
  }
}

export { createRoles, createUsers };