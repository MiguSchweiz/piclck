#!/bin/bash
adw=`cat /home/pi/.alarms|awk -F ';' '{ print $1}'`
ahr=`cat /home/pi/.alarms|awk -F ';' '{ print $2}'`
amn=`cat /home/pi/.alarms|awk -F ';' '{ print $3}'`
act=`cat /home/pi/.alarms|awk -F ';' '{ print $4}'`
rm /home/pi/.alarmOn


while true; do
    dow=`date '+%u'`
    hr=`date '+%H'`
    mn=`date '+%M'`
    [ -f /home/pi/.alarmOn ] &&  sleep 1 && continue
    for d in $adw; do
        if [ "$d" -eq "$dow" ]&&[ "$hr" -eq "$ahr" ]&&[ "$mn" -eq "$amn" ]&&[ 1 -eq "$act" ]; then
            /home/pi/piclck/bin/playStream.sh
            touch /home/pi/.alarmOn
        fi 
    done 
    sleep 1
done
