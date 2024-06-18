FROM node:20-alpine3.20

WORKDIR /usr/src/app/threebody-front

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
