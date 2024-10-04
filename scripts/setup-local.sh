#!/bin/bash
directory=$(pwd)

# Check if the environment file exists
ENV_FILE="$directory/.env"
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: Environment file '$ENV_FILE' not found!"
    exit 1
fi
# Read values from the environment file
source "$ENV_FILE"

docker network create "local-network"

mkdir -p $directory/docker/local/api-postgres

cp $directory/.env $directory/docker/local/.env

docker compose -f docker/local/docker-compose.yaml up -d --build
