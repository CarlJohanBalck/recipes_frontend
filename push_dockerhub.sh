#!/bin/bash
npm run build
# Set the Docker image name and tag
DOCKER_IMAGE_NAME="recipes"
DOCKER_IMAGE_TAG="latest"
DOCKER_HUB_USERNAME="carl0222"
DOCKER_HUB_PASSWORD="Dockerarfanalltidbra921"


# Build the Docker image using the MariaDB base image and the database dump
docker build -t $DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG -f Dockerfile .

# Login to Docker Hub
docker login --username $DOCKER_HUB_USERNAME --password $DOCKER_HUB_PASSWORD

# Tag the Docker image for deployment to Docker Hub
docker tag $DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG $DOCKER_HUB_USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG

# Push the Docker image to Docker Hub
docker push $DOCKER_HUB_USERNAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG

# Remove the local Docker image
docker rmi $DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG
