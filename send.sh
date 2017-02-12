#!/bin/sh
echo $1
DATA='{"eventData":{"value":'$1'}}'
echo $DATA
curl -X POST -H 'Content-Type: application/json' -d $DATA http://localhost:8080/evt
