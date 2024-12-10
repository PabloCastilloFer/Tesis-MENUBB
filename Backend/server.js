import { PORT, HOST } from './src/Config/configEnv.js';
import cors from 'cors';
import express, { urlencoded, json } from 'express';
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

async function setupServer() {
  try {
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
    server.use('/api', indexRoutes);

    server.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
    });
  } catch (err) {
    handleError(err, '/server.js -> setupServer');
  }
}

async function setupAPI() {
  try {
    await setupDB();
    await setupServer();
    // Crea los roles por defecto en la base de datos
    await createRoles();
    // Crea los usuarios por defecto en la base de datos
    await createUsers();
  } catch (err) {
    handleFatalError(err, '/server.js -> setupAPI');
  }
}

setupAPI()
  .then(() => console.log('=> API Iniciada exitosamente'))
  .catch((err) => handleFatalError(err, '/server.js -> setupAPI'));