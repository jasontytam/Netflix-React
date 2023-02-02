#!/bin/bash
set -xe


# Copy war file from S3 bucket 
aws s3 cp s3://tamj-netflix-fe-deploy/build.tar.gz /usr/local/Netflix-React/

cd /usr/local/Netflix-React/
tar -xzvf build.tar.gz
#rm -f build.tar.gz
cd -
