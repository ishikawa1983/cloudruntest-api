FROM node:12-slim
RUN npm install -g express-generator
RUN npm install -g firebase-tools
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
