#!/bin/zsh

# echo "接收到的参数$@"

git add .
git commit -m "$@"

git push origin main

