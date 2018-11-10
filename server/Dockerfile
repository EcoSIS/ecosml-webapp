FROM node:8.7

# install ruby and markdown library
RUN apt-get update
RUN apt-get install -y ruby-full
RUN gem install commonmarker

RUN mkdir server
COPY ./dist /server/dist
COPY ./package* /server/
COPY ./index.js /server/
COPY ./controllers /server/controllers
COPY ./lib /server/lib
COPY ./models /server/models
COPY ./templates /server/templates
COPY ./gitinfo.json /server/

RUN cd server && npm install
RUN npm install -g mocha

CMD node server