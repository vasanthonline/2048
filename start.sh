#!/usr/bin/env bash

# Uncomment below 2 lines if nvm is not installed.
# curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
# source ~/.nvm/nvm.sh
nvm install 10.15
nvm use 10.15
npm install yarn -g
yarn install
npm run compile
npm run test
npm run start

