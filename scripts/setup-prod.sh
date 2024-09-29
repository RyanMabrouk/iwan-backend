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

docker network create "prod-network"

mkdir -p $directory/docker/prod/api-postgres

docker compose -f docker/prod/docker-compose.yaml up -d --build
