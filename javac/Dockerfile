FROM node:12-slim
RUN npm install -g express-generator
RUN npm install -g firebase-tools
RUN npm install -g nodemon
RUN mkdir -p /usr/share/man/man1/
RUN apt-get update && apt-get install -y openjdk-8-jdk
WORKDIR /javac
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
