# Usa una imagen de Node.js como base
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]
# Utiliza una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en la carpeta de la aplicación
WORKDIR /usr/src/app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./
COPY wait-for-it.sh .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 8000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
