#!/bin/sh

cd $HOME/develop/blog
git checkout draft
git push
git checkout main
git merge draft
git push
git checkout draft