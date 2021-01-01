#!/bin/bash

set -e

# This env variables are the bare minimum to run the migrations. The migrations will use this env variables.
export NODE_ENV=production
export ON_GAE=true
export GCSQL_DB_USER=$GCSQL_DB_USER
export GCSQL_DB_PASS=$GCSQL_DB_PASS
export GCSQL_DB_NAME=$GCSQL_DB_NAME
export GCSQL_DB_SOCKET_PATH=/tmp/cloudsql   # Dumping the socket file into /tmp because /cloudsql is not writable.
export GCSQL_CONNECTION_NAME=$GCSQL_CONNECTION_NAME

wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
chmod +x cloud_sql_proxy

rm -f /tmp/cloud_sql_proxy.log
touch /tmp/cloud_sql_proxy.log

## Do not use $ sign unless the variable will be available for envsubst
./cloud_sql_proxy -dir=/tmp/cloudsql --instances=$GCSQL_CONNECTION_NAME > /tmp/cloud_sql_proxy.log 2>&1 &
if (timeout 10s tail -f -n +1 /tmp/cloud_sql_proxy.log &) | grep -qe 'Ready for new connections'; then
  echo "Started cloud_sql_proxy."
else
  >&2 echo "ERROR: Failed to start cloud_sql_proxy"
  >&2 cat /tmp/cloud_sql_proxy.log
  exit 1
fi

yarn build
yarn sequelize-cli db:migrate

rm cloud_sql_proxy
