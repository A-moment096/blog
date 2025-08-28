# https://just.systems
set positional-arguments

full-test:
    hugo server -D -F -E --disableFastRender -O

rm-build:
    rm -rf public resources

rebuild-test: rm-build full-test

pre-test:
    hugo server --minify -O
    
publish:
    git checkout draft
    git push
    git checkout main
    git merge draft
    git push
    git checkout draft
    
sync:
    git checkout main
    git pull
    git checkout draft
    git pull

new name:
    hugo new content 'content/posts/{{name}}/index.md'

update:
    git checkout draft
    git pull
    git push

commit message:
    git add .
    git commit -m "{{message}}"