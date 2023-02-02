#!/bin/bash
set -xe

cd /usr/local/Netflix-React/
serve -s build > log/Netflix-React.$(date '+%Y%m%d_%H%M%S').log &
