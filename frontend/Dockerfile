FROM node:20-alpine AS base
WORKDIR /usr/src/app

COPY package*.json .
RUN npm install

FROM base as development
COPY . .
EXPOSE 3000
CMD ["npm", "start"]