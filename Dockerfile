# Utiliza una imagen base de Node.js
FROM node:18-alpine3.17

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de tu aplicación al contenedor
COPY package*.json ./
COPY . ./

# Instala las dependencias de la aplicación
RUN npm install

# Compila la aplicación
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000
EXPOSE 3001

# Define el comando para ejecutar la aplicación
CMD ["npm", "start"]