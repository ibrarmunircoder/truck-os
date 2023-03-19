#!/usr/bin/env bash

set -euo pipefail

if ! command -v aws &> /dev/null
then
    printf "aws could not be found\n\n"
    exit 1
fi

if ! command -v docker &> /dev/null
then
    printf "docker could not be found\n\n"
    exit 1
fi

echo "source .env.dev"
source .env.dev
echo "  => AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID}"
echo "  => AWS_REGION=${AWS_REGION}"
echo "  => FRONTEND_IMAGE_REPO_URI=${FRONTEND_IMAGE_REPO_URI}"
echo "  => BACKEND_IMAGE_REPO_URI=${BACKEND_IMAGE_REPO_URI}"

DOCKER_IMAGE_TAG=dirty-$(git rev-parse HEAD)-$(date +%s)
echo "  => DOCKER_IMAGE_TAG=${DOCKER_IMAGE_TAG}"

aws ecr --profile "$AWS_ACCOUNT_ID" get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

docker build --memory=4096m --build-arg NODE_OPTIONS=--max-old-space-size=4096 -t "$FRONTEND_IMAGE_REPO_URI:$DOCKER_IMAGE_TAG" "--cache-from=${FRONTEND_IMAGE_REPO_URI}:latest" -t "${FRONTEND_IMAGE_REPO_URI}:latest" -f frontend/Dockerfile .
docker push "$FRONTEND_IMAGE_REPO_URI:$DOCKER_IMAGE_TAG"
docker push "$FRONTEND_IMAGE_REPO_URI:latest"
docker build --memory=4096m -t "$BACKEND_IMAGE_REPO_URI:$DOCKER_IMAGE_TAG" "--cache-from=${BACKEND_IMAGE_REPO_URI}:latest" -t "${BACKEND_IMAGE_REPO_URI}:latest" -f backend/Dockerfile .
docker push "$BACKEND_IMAGE_REPO_URI:$DOCKER_IMAGE_TAG"
docker push "$BACKEND_IMAGE_REPO_URI:latest"

