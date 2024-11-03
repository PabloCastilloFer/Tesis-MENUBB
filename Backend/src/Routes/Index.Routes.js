import { Router } from "express";
import comidaRoutes from "./comida.routes.js";

const router = Router();

router
    .use('/comida', comidaRoutes);

export default router;