FROM node:12

# install ruby and markdown library, mongodump
RUN apt-get update
RUN apt-get install -y ruby-full mongodb-clients zip
RUN gem install commonmarker

RUN npm install -g mocha

RUN mkdir server
COPY ./package* /server/

RUN cd server && npm install --production
RUN npm install -g mocha

# for live dev on server
COPY ./public /server/public

COPY ./dist /server/dist
COPY ./index.js /server/
COPY ./controllers /server/controllers
COPY ./lib /server/lib
COPY ./models /server/models
COPY ./templates /server/templates
COPY ./gitinfo.json /server/

CMD node server