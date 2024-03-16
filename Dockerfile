FROM node:18-alpine

EXPOSE 8080

WORKDIR /usr
COPY package.json ./
COPY yarn.lock ./
COPY config.json ./
COPY .puppeteerrc.js ./

RUN apk add --update --no-cache \
  make \
  g++ \
  automake \
  autoconf \
  libtool \
  nasm \
  libjpeg-turbo-dev \
  chromium
RUN yarn install
RUN yarn playwright install

COPY server ./server
CMD [ "node", "./server/index.js" ]