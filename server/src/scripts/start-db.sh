#!/bin/bash

set -e

CONTAINER="class-database";
GREEN_COLOR='\033[1;32m'
NO_COLOR='\033[0m'

echo "Removing old container [$CONTAINER] and starting new fresh instance of [$CONTAINER]"
(docker kill $CONTAINER || :) && \
  (docker rm $CONTAINER || :) && \
  docker run --name $CONTAINER \
  -p 27018:27018 \
  -d mongo:4.0 \
  mongod --port 27018 --bind_ip_all


echo "Waiting for [$CONTAINER] to start...";
SLEEP 5;
echo -e "${GREEN_COLOR}[$CONTAINER] has started successfully!${NO_COLOR}";