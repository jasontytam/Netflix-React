#!/bin/bash
set -xe

# Delete the old  directory as needed.
if [ -d /usr/local/codedeployresources ]; then
    rm -rf /usr/local/codedeployresources/
fi

mkdir -vp /usr/local/codedeployresources

if [ ! -d /usr/local/Netflix-React ]; then
  mkdir /usr/local/Netflix-React
else
  cd /usr/local/Netflix-React

  if [ ! -d /usr/local/Netflix-React/backup ]; then
    mkdir /usr/local/Netflix-React/backup
  fi

  #tar -czvf "backup/build_$(date '+%Y%m%d_%H%M%S').tar.gz" build
  if [ -f build.tar.gz ]; then
    mv build.tar.gz "backup/build_$(date '+%Y%m%d_%H%M%S').tar.gz"
  fi

  if [ -d build ]; then
    rm -rf build
  fi
  
  cd -
fi

if [ ! -d /usr/local/Netflix-React/log ]; then
  mkdir /usr/local/Netflix-React/log
fi


