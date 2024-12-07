// Importa el archivo 'configEnv.js' para cargar las variables de entorno
import { PORT, HOST } from './src/Config/configEnv.js';
// Importa el módulo 'cors' para agregar los cors
import cors from 'cors';
// Importa el módulo 'express' para crear la aplicacion web
import express, { urlencoded, json } from 'express';
// Importamos morgan para ver las peticiones que se hacen al servidor
import morgan from 'morgan';
// Importa el módulo 'cookie-parser' para manejar las cookies
//import cookieParser from 'cookie-parser';
/** El enrutador principal */
import indexRoutes from './src/Routes/index.Routes.js';
// Importa el archivo 'configDB.js' para crear la conexión a la base de datos
import { setupDB } from './src/Config/configDB.js';
// Importa el handler de errores
import { handleFatalError, handleError } from './src/Utils/errorHandler.js';
import { createRoles, createUsers } from './src/config/initialSetup.js';

/**
 * Inicia el servidor web
 */
async function setupServer() {
  try {
    /** Instancia de la aplicacion */
    const server = express();
    server.disable('x-powered-by');
    // Agregamos los cors
    server.use(cors({ credentials: true, origin: true }));
    // Agrega el middleware para el manejo de datos en formato URL
    server.use(urlencoded({ extended: true }));
    // Agrega el middleware para el manejo de datos en formato JSON
    server.use(json());
    // Agregamos el middleware para el manejo de cookies
    //server.use(cookieParser());
    // Agregamos morgan para ver las peticiones que se hacen al servidor
    server.use(morgan('dev'));
    // Agrega ruta para servir archivos estáticos
    server.use('/api/src/Upload', express.static('src/Upload'));
    // Agrega el enrutador principal al servidor
    server.use('/api', indexRoutes);

    // Inicia el servidor en el puerto especificado
    server.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
    });
  } catch (err) {
    handleError(err, '/server.js -> setupServer');
  }
}

/**
 * Inicia la API
 */
async function setupAPI() {
  try {
    // Inicia la conexión a la base de datos
    await setupDB();
    // Inicia el servidor web
    await setupServer();
    // Crea los roles por defecto en la base de datos
    await createRoles();
    // Crea los usuarios por defecto en la base de datos
    await createUsers();
  } catch (err) {
    handleFatalError(err, '/server.js -> setupAPI');
  }
}

// Inicia la API
setupAPI()
  .then(() => console.log('=> API Iniciada exitosamente'))
  .catch((err) => handleFatalError(err, '/server.js -> setupAPI'));