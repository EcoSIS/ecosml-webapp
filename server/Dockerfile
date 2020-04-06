FROM node:12

RUN echo "postfix postfix/main_mailer_type string Internet site" > /preseed.txt
RUN echo "postfix postfix/mailname string ecosml.org" >> /preseed.txt
RUN DEBIAN_FRONTEND=noninteractive
RUN debconf-set-selections /preseed.txt

# install ruby and markdown library, mongodump
RUN apt-get update && \
    apt-get install -y ruby-full mongodb-clients zip \
    postfix mailutils

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