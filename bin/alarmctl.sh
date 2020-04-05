#!/bin/bash
slum=`cat /home/pi/piclck/www/alarms | awk -F ";" '{ print $5 }'`
if [ "$1" == "stop" ];then
    pkill vlc
    pkill playStream.sh
    rm /home/pi/.alarmOn
elif [ "$1" == "slum" ];then
    pkill vlc
    pkill playStream.sh
    sleep $slum
    /home/pi/piclck/bin/launchStream.sh
fi
