FROM node:16

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
ARG ENV=development
ENV ENV $ENV

ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19001 19002

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm --allow-root -g npm@latest expo-cli@latest

RUN apt update && apt install android-tools-adb -y

RUN mkdir /app
WORKDIR /app
ENV PATH /app/.bin:$PATH
COPY . /app
RUN yarn install