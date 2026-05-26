#!/usr/bin/env bash

#docker build --no-cache -t once_haerin:v1 --build-arg APP_VERSION=1.0.0 --build-arg APP_BUILD=26052201 .
#docker build --no-cache -t once_haerin:v2 --build-arg APP_VERSION=2.0.0 --build-arg APP_BUILD=26052202 .

docker build --build-arg APP_VERSION=1.0.0 --build-arg APP_BUILD=26052201 -t once_haerin:v1 .
docker build --build-arg APP_VERSION=2.0.0 --build-arg APP_BUILD=26052202 -t once_haerin:v2 .

#docker build --no-cache --build-arg APP_VERSION=1.0.0 --build-arg APP_BUILD=26052201 -t once_haerin:v1 .
#docker build --no-cache --build-arg APP_VERSION=2.0.0 --build-arg APP_BUILD=26052202 -t once_haerin:v2 .


docker tag once_haerin:v1 localhost:5000/once_haerin:v1
docker tag once_haerin:v2 localhost:5000/once_haerin:v2


docker push localhost:5000/once_haerin:v1
docker push localhost:5000/once_haerin:v2



# SECRECT
# Turn on Auto update in ONCE settings
# You just need to update the image in the registry and ONCE will pull the new image and restart the app with the new version. No need to restart ONCE itself.
# Just use latest tag and update the image in the registry, ONCE will pull the new image and restart the app with the new version. No need to restart ONCE itself.
# docker tag once_haerin:v2 localhost:5000/once_haerin:latest
# docker push localhost:5000/once_haerin:latest

# it feel replacement, but it's actually update. You just need to update the image in the registry and ONCE will pull the new image and restart the app with the new version. No need to restart ONCE itself.