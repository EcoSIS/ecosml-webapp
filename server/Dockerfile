FROM node:18

RUN echo "postfix postfix/main_mailer_type string Internet site" > /preseed.txt
RUN echo "postfix postfix/mailname string ecosml.org" >> /preseed.txt
RUN DEBIAN_FRONTEND=noninteractive
RUN debconf-set-selections /preseed.txt

RUN curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
   gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
# RUN echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
RUN echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/debian bullseye/mongodb-org/7.0 main" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# install ruby and markdown library, mongodump
RUN apt-get update && \
    apt-get install -y ruby-full mongodb-org-shell mongodb-org-tools zip \
    postfix mailutils

# hack for latest git.  adding testing AFTER install above
RUN echo "deb http://ftp.us.debian.org/debian testing main contrib non-free" >> /etc/apt/sources.list
RUN apt-get update && \
    apt-get install -y git/testing

RUN update-rc.d postfix enable
RUN rm /preseed.txt

RUN gem install commonmarker -v 0.20.1
RUN npm install -g mocha

COPY ./docker-run.sh /

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
# COPY ./gitinfo.json /server/

CMD ./docker-run.sh