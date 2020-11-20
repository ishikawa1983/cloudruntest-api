FROM node:12-slim
RUN npm install -g @vue/cli
RUN npm install -g firebase-tools
RUN npm install -g http-server
WORKDIR /public
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "http-server", "dist" ]
