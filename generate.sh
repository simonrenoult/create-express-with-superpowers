#!/usr/bin/env bash

git clone git@github.com:simonrenoult/express-with-superpowers.git ./foobar
cd ./foobar
rm -rf .git
git init && git add --all && git commit --message="Initial commit"