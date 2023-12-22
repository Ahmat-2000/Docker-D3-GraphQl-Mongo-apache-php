FROM node:18-alpine

WORKDIR /myapp

COPY package.json /myapp

RUN npm install

COPY . /myapp

CMD [ "node", "index.js" ]