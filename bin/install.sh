#!/usr/bin/bash

npm ci
mv -f .env.frontend .env
npm run build
npm run generate:types
