#!/bin/bash
slum=`cat /home/pi/piclck/www/alarms | awk -F ";" '{ print $5 }'`
if [ "$1" == "stop" ];then
    pkill playStream.sh
    pkill vlc
    rm /home/pi/.alarmOn
    rm /home/pi/.slum
elif [ "$1" == "slum" ];then
    if [ -f /home/pi/.slum ];then
        exit
    fi
    touch /home/pi/.slum
    pkill playStream.sh
    pkill vlc
    sleep $slum
    /home/pi/piclck/bin/playStream.sh &
    rm /home/pi/.slum
fi
