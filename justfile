set quiet := true

install:
    npm install

build:
    npm run build

pub:
    npm run pub

update:
    npm update
    git add package.json package-lock.json
    git commit -m "feat: update packages"
    npm version patch
