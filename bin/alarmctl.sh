#!/bin/bash
slum=`cat /home/pi/.alarms | awk -F ";" '{ print $5 }'`
if [ "$1" == "stop" ];then
    pkill vlc
    rm /home/pi/.alarmOn
elif [ "$1" == "slum" ];then
    pkill vlc
    sleep $slum
    /home/pi/piclck/bin/playStream.sh
fi
