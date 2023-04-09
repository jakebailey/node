#!/usr/bin/sh

while true; do
    inotifywait -qr -e modify -e create -e delete -e move lib
    make
done
