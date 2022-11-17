#!/bin/bash
zip -FSr dist/firefox_mastodon4_redirect-$(cat ./manifest.json | grep \"version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]').zip . -x '*.git*' '*.vscode*' '*dist*' '*chrome*' 'build.sh' 'setup.sh'

cd chrome
zip -FSr ../dist/chrome_mastodon4_redirect-$(cat ./manifest.json | grep \"version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]').zip . -x src/m4redirect.js
