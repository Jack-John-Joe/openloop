#!/bin/bash
# instead of implementing normal IM like a normal person,
# we have this garbage.
# whenever someon esends message it gets added to the message log, we know that.
# all this does is continually cat the message log 
while true; do
    sleep 0.01
    cat ./log/im.log
    sleep 0.1
    clear
done

