/**
 * Middleware de autorización basado en roles
 * @param {Array<String>} allowedRoles - Lista de roles permitidos
 */
const authorizeRole = (allowedRoles) => (req, res, next) => {
  try {
    const userRoles = req.user?.roles; // Obtén los roles del token decodificado

    if (!userRoles || !userRoles.some((role) => allowedRoles.includes(role))) {
      return res.status(403).json({ message: "No tienes permisos para realizar esta acción." });
    }

    next(); // Permitir acceso si tiene el rol adecuado
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export default authorizeRole;