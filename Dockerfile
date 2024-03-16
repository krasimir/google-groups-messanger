FROM mcr.microsoft.com/playwright:v1.42.1-jammy

EXPOSE 8080

WORKDIR /usr
COPY package.json ./
COPY yarn.lock ./
COPY config.json ./

RUN yarn install
RUN yarn playwright install

COPY server ./server
CMD [ "node", "./server/index.js" ]