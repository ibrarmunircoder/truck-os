if [ "$WIPE_DATABASE" = "true" ]; then
    echo "- Database is wiping."
    DB_PROTO="$(echo $BACKEND_DATABASE_URL | grep :// | sed -e's,^\(.*://\).*,\1,g')"
    DB_URL=$(echo $BACKEND_DATABASE_URL | sed -e s,$DB_PROTO,,g)
    DB_USER="$(echo $DB_URL | grep @ | cut -d@ -f1)"
    DB_NAME="$(echo $DB_URL | grep / | cut -d/ -f2-)"
    export TYPEORM_URL=$(echo "$BACKEND_DATABASE_URL" | sed -E "s/(.*)$DB_NAME/\1postgres/")
    if [ -d "/src/backend/node_modules/.bin" ] 
    then
        TYPEORM_PATH="/src/backend/node_modules/.bin"
    else
        TYPEORM_PATH="/app/node_modules/.bin"
    fi
    $TYPEORM_PATH/typeorm query "REVOKE CONNECT ON DATABASE \"$DB_NAME\" FROM public;"
    $TYPEORM_PATH/typeorm query "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '$DB_NAME' AND pid <> pg_backend_pid();"
    $TYPEORM_PATH/typeorm query "DROP DATABASE \"$DB_NAME\""
    $TYPEORM_PATH/typeorm query "CREATE DATABASE \"$DB_NAME\""
    $TYPEORM_PATH/typeorm query "GRANT CONNECT ON DATABASE \"$DB_NAME\" TO public;"
    $TYPEORM_PATH/typeorm query "ALTER DATABASE \"$DB_NAME\" OWNER TO cloudsqlsuperuser;"
fi
