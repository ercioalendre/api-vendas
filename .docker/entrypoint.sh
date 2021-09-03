#!/bin/bash

npm i --package-lock-only
npm ci
npm run typeorm migration:run
npm run dev