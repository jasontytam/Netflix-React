#!/bin/bash
#set -xe

whoami
node --version
npm --version
env


cd /usr/local/Netflix-React/
serve -s build > log/Netflix-React.$(date '+%Y%m%d_%H%M%S').log
