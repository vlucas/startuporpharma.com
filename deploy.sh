#!/bin/bash
GIT_REPO_URL=$(git config --get remote.origin.url)

# Build the JS bundle
npm run build

# Copy everything in public/ and deploy it to gh-pages
mkdir .deploy
cp -R ./public/* .deploy
cd .deploy
git init .
git remote add github $GIT_REPO_URL
git checkout -b gh-pages
git add .
git commit -am "Static site deploy: `date +"%m-%d-%y %r"`"
git push github gh-pages --force
cd ..
rm -rf .deploy
