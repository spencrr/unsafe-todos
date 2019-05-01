FROM node:alpine

WORKDIR /src

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
