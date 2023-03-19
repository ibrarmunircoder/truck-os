#!/bin/ash
if [ -f /etc/secrets/.env ]; then
    set -o allexport
    source /etc/secrets/.env
    set +o allexport
fi;
./node_modules/.bin/next start