#!/bin/bash

echo "Starting script..."
docker pull ulyhmyges/client-ci
docker run --rm -d --name client-ci-c --platform linux/amd64 ulyhmyges/client-ci
echo "Script ended"