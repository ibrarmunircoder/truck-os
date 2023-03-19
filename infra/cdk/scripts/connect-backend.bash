SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

ENV=$1

if [ ! -f "$SCRIPT_DIR/../env/$ENV.json" ]
then
    echo "$SCRIPT_DIR/../env/$ENV.json does not exist. Run \"sync-environments.ts\""
    exit 1
fi

if ! command -v aws &> /dev/null
then
    printf "aws could not be found\n\n"
    printf "  execute the following command to install aws:\n"
    printf "  -----------------------\n"
    printf "   brew install awscli\n"
    exit 1
fi

if ! command -v jq &> /dev/null
then
    printf "jq could not be found\n\n"
    printf "  execute the following command to install jq:\n"
    printf "  -----------------------\n"
    printf "   brew install jq\n"
    exit 1
fi


ENV_CONTENT=$(cat "$SCRIPT_DIR/../env/$ENV.json")

AWS_ECS_CLUSTER_NAME=$(jq -r '.AWS_ECS_CLUSTER_NAME' <<< "$ENV_CONTENT")
echo "  => AWS_ECS_CLUSTER_NAME=${AWS_ECS_CLUSTER_NAME}"
AWS_ECS_BACKEND_SERVICE_NAME=$(jq -r '.AWS_ECS_BACKEND_SERVICE_NAME' <<< "$ENV_CONTENT")
echo "  => AWS_ECS_BACKEND_SERVICE_NAME=${AWS_ECS_BACKEND_SERVICE_NAME}"
AWS_REGION=$(jq -r '.AWS_REGION' <<< "$ENV_CONTENT")
echo "  => AWS_REGION=${AWS_REGION}"
AWS_ACCOUNT_ID=$(jq -r '.AWS_ACCOUNT_ID' <<< "$ENV_CONTENT")
echo "  => AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID}"

TASK_ID=$(aws ecs list-tasks --cluster "$AWS_ECS_CLUSTER_NAME" --profile "$AWS_ACCOUNT_ID" --region ${AWS_REGION} --output json --service "$AWS_ECS_BACKEND_SERVICE_NAME" | jq '.taskArns[0]' | sed 's/.*\///g' | sed 's/"//g')
echo "  => TASK_ID=${TASK_ID}"

if [ -z "$TASK_ID" ]; then
  echo "  => No task found"
  exit 1
fi

aws ecs execute-command --cluster "$AWS_ECS_CLUSTER_NAME" --profile "$AWS_ACCOUNT_ID" --region ${AWS_REGION} --interactive --command "/bin/sh" --task "$TASK_ID"
