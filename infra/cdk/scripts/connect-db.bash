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

RDS_HOSTNAME=$(jq -r '.RDS_MASTER_HOSTNAME' <<< "$ENV_CONTENT")
echo "  => RDS_HOSTNAME=${RDS_HOSTNAME}"

RDS_PORT=$(jq -r '.RDS_MASTER_PORT' <<< "$ENV_CONTENT")
echo "  => RDS_PORT=${RDS_PORT}"

DB_NAME="roqone"
echo "  => DB_NAME=${DB_NAME}"

AWS_REGION=$(jq -r '.AWS_REGION' <<< "$ENV_CONTENT")
echo "  => AWS_REGION=${AWS_REGION}"

AWS_ECS_CLUSTER_NAME=$(jq -r '.AWS_ECS_CLUSTER_NAME' <<< "$ENV_CONTENT")
echo "  => AWS_ECS_CLUSTER_NAME=${AWS_ECS_CLUSTER_NAME}"

AWS_ECS_BACKEND_SERVICE_NAME=$(jq -r '.AWS_ECS_BACKEND_SERVICE_NAME' <<< "$ENV_CONTENT")
echo "  => AWS_ECS_BACKEND_SERVICE_NAME=${AWS_ECS_BACKEND_SERVICE_NAME}"

DATABASE_URL=$(jq -r '.DATABASE_URL' <<< "$ENV_CONTENT")
echo "  => DATABASE_URL=${DATABASE_URL}"

AWS_ACCOUNT_ID=$(jq -r '.AWS_ACCOUNT_ID' <<< "$ENV_CONTENT")
echo "  => AWS_ACCOUNT_ID=${AWS_REGION}"

TASK_ID=$(aws ecs list-tasks --cluster "$AWS_ECS_CLUSTER_NAME" --profile "$AWS_ACCOUNT_ID" --region "$AWS_REGION" --output json --service "$AWS_ECS_BACKEND_SERVICE_NAME" | jq '.taskArns[0]' | sed 's/.*\///g' | sed 's/"//g')
echo "  => TASK_ID=${TASK_ID}"

CURRENT_USER=iam_$(aws sts get-caller-identity --output json | jq '.Arn' | awk -F"user/" '{print (NF>1)? $NF : ""}' | sed 's/"//g')
echo "  => CURRENT_USER=${CURRENT_USER}"

if [ -z "$TASK_ID" ]; then
  echo "  => No task found"
  exit 1
fi


function login_superuser() {
    TOKEN="$(aws rds generate-db-auth-token \
                --hostname "$RDS_HOSTNAME" \
                --port "$RDS_PORT" \
                --region "$AWS_REGION" \
                --username "$DB_NAME" )"
    echo "  => TOKEN=$TOKEN"

    printf "\n\n"
    echo "  $ psql" "\"$DATABASE_URL\""
    printf "\n\n"

    aws ecs execute-command --cluster "$AWS_ECS_CLUSTER_NAME" --region "$AWS_REGION" --profile "$AWS_ACCOUNT_ID" --interactive --command "psql \"$DATABASE_URL\"" --task "$TASK_ID"
}

login_superuser

