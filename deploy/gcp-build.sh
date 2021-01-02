#!/bin/bash

# cloudsql code referenced from https://github.com/GoogleCloudPlatform/ruby-docker/blob/master/ruby-build-tools/access_cloud_sql

set -e

source deploy/source_env.sh

SQL_TIMEOUT=10

wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
chmod +x cloud_sql_proxy

rm -f /tmp/cloud_sql_proxy.log
touch /tmp/cloud_sql_proxy.log

./cloud_sql_proxy -dir=$GCSQL_DB_SOCKET_PATH --instances=$GCSQL_CONNECTION_NAME > /tmp/cloud_sql_proxy.log 2>&1 &
if (timeout ${SQL_TIMEOUT}s tail -f -n +1 /tmp/cloud_sql_proxy.log &) | grep -qe 'Ready for new connections'; then
  echo "Started cloud_sql_proxy."
else
  >&2 echo "ERROR: Failed to start cloud_sql_proxy"
  >&2 cat /tmp/cloud_sql_proxy.log
  exit 1
fi

yarn build
yarn sequelize-cli db:migrate

rm cloud_sql_proxy
