#!/usr/bin/env bash

cleanFilesTemp() {
  rm -f ./*.jpg ./*.jpeg ./*.webp ./*.opus ./*.mp* ./*.m4a ./*.ogg ./*.zip ./*.gz ./*.png
}

updateBot() {
  node index.js up
}

startWithCode() {
  node index.js cd
}

startWithQr() {
  node index.js qr
}

defaultStart() {
  node index.js
}

while :
do
  echo -e "    \033[1;33mHUTAO BOT V10.0.0 PRO EDITION 💎 ^-^\n INICIANDO MEUS SISTEMAS... 🌷\033[0m"

  cleanFilesTemp

  case "$1" in
    up) updateBot ;;
    cd) startWithCode ;;
    qr) startWithQr ;;
    *)  defaultStart ;;
  esac

  sleep 5
done