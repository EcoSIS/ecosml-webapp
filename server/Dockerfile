FROM node:8.7

RUN mkdir app
COPY ./dist /app/dist
COPY ./package* /app/
COPY ./index.js /app/
COPY ./controllers /app/controllers
COPY ./lib /app/lib
COPY ./models /app/models

RUN cd app && npm install

CMD node app