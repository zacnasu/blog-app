# Taken from https://dev.to/raphaelmansuy/deploy-a-docker-app-to-aws-using-ecs-3i1g 
FROM node:16


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]