#!/bin/bash
set -x


SLEEP_TIME=10

PID=`ps axf |grep serve |grep build | grep -o '^[ ]*[0-9]*' |xargs`
if [ ! -z "$PID" ]; then
  echo "Process is running (pid: $PID). Issuing kill..."
  #pkill -9 -f Netflix-App
  kill $PID
  sleep $SLEEP_TIME
  exit 0
else
  echo "Process is not running."
  exit 0
fi
