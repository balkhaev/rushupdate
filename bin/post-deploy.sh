#!/usr/bin/bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

. ./.env

# Execute install script and check for errors
if sh ./bin/install.sh; then
  npm run pm2:prod
else
  echo "Installation script failed. Aborting."
  exit 1
fi
