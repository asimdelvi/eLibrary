FROM node:20-alpine AS base
WORKDIR /usr/src/app/

RUN npm install -g nodemon
COPY package*.json .
RUN npm install

FROM base AS development
COPY . .
EXPOSE 3090
CMD ['nodemon', 'app.js']