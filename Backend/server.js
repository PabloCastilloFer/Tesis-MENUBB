
// Importa el archivo 'configEnv.js' para cargar las variables de entorno
import { PORT, HOST } from "./src/Config/configEnv.js";
// Importa el módulo 'cors' para agregar los cors
import cors from "cors";
// Importa el módulo 'express' para crear la aplicacion web
import express, { urlencoded, json } from "express";
// Importamos morgan para ver las peticiones que se hacen al servidor
import morgan from "morgan";
// Importa el módulo 'cookie-parser' para manejar las cookies
//import cookieParser from "cookie-parser";
/** El enrutador principal */
import indexRoutes from "./src/Routes/Index.Routes.js";
// Importa el archivo 'configDB.js' para crear la conexión a la base de datos
import { setupDB } from "./src/Config/configDB.js";
// Importa el handler de errores
import { handleFatalError, handleError } from "./src/utils/errorHandler.js";
//import { createFacultades, createRoles, createUsers } from "./config/initialSetup.js";
//import marcarTareasNoRealizadas from './services/scheduler.service.js'; // Importa la función de tareas programadas

/**
 * Inicia el servidor web
 */
async function setupServer() {
  try {
    /** Instancia de la aplicacion */
    const server = express();
    server.disable("x-powered-by");
    // Agregamos los cors
    server.use(cors({ credentials: true, origin: true }));
    // Agrega el middleware para el manejo de datos en formato URL
    server.use(urlencoded({ extended: true }));
    // Agrega el middleware para el manejo de datos en formato JSON
    server.use(json());
    // Agregamos el middleware para el manejo de cookies
    //server.use(cookieParser());
    // Agregamos morgan para ver las peticiones que se hacen al servidor
    server.use(morgan("dev"));
    // Agrega ruta para servir archivos estáticos
    server.use("/api/src/Upload", express.static("src/Upload"));
    // Agrega el enrutador principal al servidor
    server.use("/api", indexRoutes);

    // Inicia el servidor en el puerto especificado
    server.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
    });
  } catch (err) {
    handleError(err, "/server.js -> setupServer");
  }
}

/**s
 * Inicia la API
 */
async function setupAPI() {
  try {
    // Inicia la conexión a la base de datos
    await setupDB();
    // Inicia el servidor web
    await setupServer();
  } catch (err) {
    handleFatalError(err, "/server.js -> setupAPI");
  }
}

// Inicia la API
setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((err) => handleFatalError(err, "/server.js -> setupAPI"));