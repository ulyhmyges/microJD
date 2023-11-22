#!/usr/bin/bash

echo "Running a client-ci container..."
docker pull ulyhmyges/client-ci
docker run --name client-ci-container -d ulyhmyges/client-ci
docker logs -f client-ci-container
echo "End of script"