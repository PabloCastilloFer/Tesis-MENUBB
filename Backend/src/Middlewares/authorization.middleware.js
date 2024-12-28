/**
 * Middleware para verificar si el usuario tiene un rol permitido
 * @param {Array} allowedRoles - Lista de roles permitidos
 */
const authorizeRole = (allowedRoles) => (req, res, next) => {
  try {
    // Verifica que el rol está presente en req.user
    const userRole = req.user?.roles;

    if (!userRole) {
      return res.status(403).json({ message: "No se encontró el rol del usuario." });
    }

    // Verifica si el rol del usuario está en la lista de roles permitidos
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "No tienes permiso para acceder a esta ruta." });
    }

    next(); // Continúa al siguiente middleware o controlador
  } catch (error) {
    console.error("Error en authorizeRole:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export default authorizeRole;