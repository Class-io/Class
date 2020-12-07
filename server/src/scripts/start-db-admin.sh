#!/bin/bash

set -e

CONTAINER="database-admin";
GREEN_COLOR='\033[1;32m'
NO_COLOR='\033[0m'

echo "Removing old container [$CONTAINER] and starting new fresh instance of [$CONTAINER]"
(docker kill $CONTAINER || :) && \
  (docker rm $CONTAINER || :) && \
  docker run --name $CONTAINER -e HOST=0.0.0.0 \
  -p 1234:1234 \
  -d mrvautin/adminmongo

echo "Waiting for [$CONTAINER] to start...";
SLEEP 5;
echo -e "${GREEN_COLOR}[$CONTAINER] has started successfully!${NO_COLOR}";