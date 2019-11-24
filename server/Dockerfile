FROM node:12

# install ruby and markdown library
RUN apt-get update
RUN apt-get install -y ruby-full
#RUN gem install "rubygems-update:<3.0.0" --no-document
#RUN update_rubygems
RUN gem install commonmarker

RUN npm install -g mocha

RUN mkdir server
COPY ./package* /server/
RUN cd server && npm install --production

COPY ./dist /server/dist
COPY ./index.js /server/
COPY ./controllers /server/controllers
COPY ./lib /server/lib
COPY ./models /server/models
COPY ./templates /server/templates
COPY ./gitinfo.json /server/

CMD node server