ARG NODE_VERSION=18.18.2

# Define base stage

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install -g http-server && npm install

COPY . /usr/src/app/

USER node

EXPOSE 8080

CMD ["http-server"]