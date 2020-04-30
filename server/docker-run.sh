#! /bin/bash

postconf -e "myorigin = ecosml.org"
postconf -e "myhostname = ecosml.org"
service postfix start

node server