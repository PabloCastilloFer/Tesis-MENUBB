# Usa una imagen base de Node.js
FROM node:22

# Establece el directorio de trabajo en el contenedor
WORKDIR /Backend

# Copia los archivos de configuración de NPM
COPY Backend/package*.json /app/Backend/

# Instala las dependencias
RUN npm install --prefix /app/Backend

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Expone el puerto en el que tu aplicación se ejecuta
EXPOSE 5000

# Variable de entorno para producción
ENV NODE_ENV=production

# Comando para ejecutar la aplicación
CMD ["npm", "start"]