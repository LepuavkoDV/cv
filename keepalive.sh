#!/bin/bash

TIMEOUT_DEFAULT_VALUE=180
TIMEOUT=$TIMEOUT_DEFAULT_VALUE
URL_TO_FETCH="https://ldvcv.herokuapp.com"

while true
do
    while [ $TIMEOUT -gt 0 ]; do
        echo -ne "\e[39mNext update in: \e[32m$TIMEOUT \e[39msec\033[0K\r"
        sleep 1
        : $((TIMEOUT--))
        if [ $TIMEOUT == 1 ]; then
            echo -ne "\e[39mUpdating \033[0K\r"
            sleep 1
            echo -ne "\e[39m"
            wget $URL_TO_FETCH
            echo -ne "\e[32mDONE \033[0K\r"
            sleep 1
            echo -ne "\e[39mDoing some cleanups... \033[0K\r"
            rm -rf index.html*
            sleep 1
            echo -ne "\e[39mRestarting... \033[0K\r"
            sleep 1
            TIMEOUT=$TIMEOUT_DEFAULT_VALUE
            clear
        fi
    done
done