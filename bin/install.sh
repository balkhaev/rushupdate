#!/usr/bin/bash

npm ci
# mv -f .env.frontend .env
# npm run generate:types
npm run build
