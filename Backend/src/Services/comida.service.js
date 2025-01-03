import Comida from "../Models/comida.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

class ComidaService {
  /**
   * Obtener las comidas de un local
   * @param {String} token - Token de acceso
   * @returns {Array} - Lista de comidas
   */
  static async getComidasByLocal(token) {
    try {
      // Decodificar el token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      // Verificar que el payload contiene un local
      if (!decoded.local) {
        throw { status: 403, message: "No tienes un local asociado." };
      }

      // Validar que el ID del local sea un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(decoded.local)) {
        throw { status: 400, message: "ID de local no válido." };
      }

      // Obtener las comidas asociadas al local
      const comidas = await Comida.find({ local: decoded.local }).populate('nombreComida');
      if (comidas.length === 0) {
        throw { status: 404, message: "No se encontraron comidas para este local." };
      }

      // Retornar las comidas con la estructura esperada
      return comidas.map((comida) => ({
        id: comida._id,
        nombreComida: comida.nombreComida,
        precio: comida.precio,
        calorias: comida.calorias,
        proteinas: comida.proteinas,
        lipidos: comida.lipidos,
        carbohidratos: comida.carbohidratos,
        imagen: comida.imagen,
        estado: comida.estado,
      }));
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message || "Error al obtener las comidas del local.",
      };
    }
  }
}

export default ComidaService;
