#!/bin/bash
set -xe

. "/root/.bashrc"

cd /usr/local/Netflix-React/
serve -s build > log/Netflix-React.$(date '+%Y%m%d_%H%M%S').log &
cd -
