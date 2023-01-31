#!/bin/bash
set -x

NUMBER_OF_ATTEMPTS=10
SLEEP_TIME=3

for i in `seq 1 $NUMBER_OF_ATTEMPTS`;
do
  PID=`ps axf |grep serve |grep build | grep -o '^[ ]*[0-9]*' |xargs`
  if [ ! -z "$PID" ]; then
    echo "Process is running (pid: $PID)."
    exit 0
  else
    echo "Process is not running. retrying..."
  fi
  sleep $SLEEP_TIME
done
echo "Server did not come up after expected time. Failing."
exit 1