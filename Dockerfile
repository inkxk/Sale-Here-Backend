FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install

COPY . .

EXPOSE 6002
CMD [ "npm", "start" ]