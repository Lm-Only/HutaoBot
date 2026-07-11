#!/usr/bin/env bash

node --no-warnings -e "require('node:fs').rmSync(require('./assets/settings/system.json').auth_name,{recursive:true,force:true});console.log('Pasta do qr - code deletada. Execute \'npm start\' para iniciar.');"
