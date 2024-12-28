const authorizeRole = (allowedRoles) => (req, res, next) => {
  try {
    const userRole = req.user?.roles?.name;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "No tienes permisos para realizar esta acción. AAAAAA" });
    }

    next();
  } catch (error) {
    console.error("Error en el middleware de autorización:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export default authorizeRole;