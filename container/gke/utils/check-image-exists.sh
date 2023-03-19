CONTAINER_TAG_LIST=$(gcloud container images list-tags ${CONTAINER_REGISTRY} --filter="'${SHORT_SHA}'" --format='json')
if [ "$CONTAINER_TAG_LIST" = '[]' ]; then
    echo "false"
    exit 0
else
    echo "true"
    exit 0
fi