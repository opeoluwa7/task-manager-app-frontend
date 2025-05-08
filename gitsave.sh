#!/bin/zsh

echo "git add"

git add .

sleep 1

echo "git commit..."

git commit -m "test"

sleep 1

echo "git push to main"

git push origin main




