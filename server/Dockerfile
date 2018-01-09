FROM node:8.7

RUN mkdir server
COPY ./dist /server/dist
COPY ./package* /server/
COPY ./index.js /server/
COPY ./controllers /server/controllers
COPY ./lib /server/lib
COPY ./models /server/models

RUN cd server && npm install
RUN npm install -g mocha

CMD node server