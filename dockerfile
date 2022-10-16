# specify the node base image with your desired version node:<version>
FROM node:18
WORKDIR /application
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]