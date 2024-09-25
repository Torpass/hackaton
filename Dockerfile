# Usa una imagen base de Node.js
FROM node:20.13.1

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /scr/app

# Copia el package.json y el package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/app.js"]