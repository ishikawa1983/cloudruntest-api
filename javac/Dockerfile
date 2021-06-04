FROM node:12-slim
RUN npm install -g express-generator
# RUN npm install -g firebase-tools
RUN npm install -g nodemon
RUN mkdir -p /usr/share/man/man1/
RUN apt-get update && apt-get install -y openjdk-8-jdk
RUN apt-get install -y locales && echo "ja_JP UTF-8" > /etc/locale.gen && locale-gen
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:en
ENV LC_ALL ja_JP.UTF-8
WORKDIR /javac
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
