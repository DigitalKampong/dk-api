#!/bin/bash

# This file will be envsubst in the build process. This contains the bare minimum of env variables
# for the migrations to run successfully.

export NODE_ENV=production
export ON_GAE=true
export GCSQL_DB_USER=$GCSQL_DB_USER
export GCSQL_DB_PASS=$GCSQL_DB_PASS
export GCSQL_DB_NAME=$GCSQL_DB_NAME
export GCSQL_DB_SOCKET_PATH=/tmp/cloudsql   # Dumping the socket file into /tmp because /cloudsql is not writable.
export GCSQL_CONNECTION_NAME=$GCSQL_CONNECTION_NAME
