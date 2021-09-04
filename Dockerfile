FROM node:14.15.4-alpine3.12

RUN apk add --no-cache bash

RUN apk add yarn

WORKDIR /home/node/app

USER node