#!/bin/zsh

echo "git add ."

git add .

sleep 1

echo "git commit -m 'test'... "

git commit -m "test"

sleep 1

echo "git push origin main"

git push origin main


