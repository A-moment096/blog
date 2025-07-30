# https://just.systems
set windows-shell :=["C:\\Program Files\\Git\\usr\\bin\\sh.exe","-c"]

default:
    echo 'Hello, world!'

full-test:
    hugo server -D -F -E --disableFastRender -O

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