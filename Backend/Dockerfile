# Usa una imagen base de Node.js
FROM node:22

# Establece el directorio de trabajo en el contenedor
WORKDIR /Backend

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Expone el puerto en el que tu aplicación se ejecuta
EXPOSE 5000

# Variable de entorno para producción
ENV NODE_ENV=production

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
