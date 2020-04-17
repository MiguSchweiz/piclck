#!/bin/bash
exec >/tmp/piclck.log
adw=`cat /home/pi/piclck/www/alarms|awk -F ';' '{ print $1}'`
ahr=`cat /home/pi/piclck/www/alarms|awk -F ';' '{ print $2}'`
amn=`cat /home/pi/piclck/www/alarms|awk -F ';' '{ print $3}'`
act=`cat /home/pi/piclck/www/alarms|awk -F ';' '{ print $4}'`
rm /home/pi/.alarmOn
cat /home/pi/piclck/www/alarms


while true; do
    dow=`date '+%w'`
    hr=`date '+%H'`
    mn=`date '+%M'`
    #echo $dow":"$hr":"$mn
    if [ -f /home/pi/.alarmOn ]; then
        sleep 1
        continue
    fi
    for d in $adw; do
        if [ "$d" -eq "$dow" ]&&[ "$hr" -eq "$ahr" ]&&[ "$mn" -eq "$amn" ]&&[ 1 -eq "$act" ]; then
            echo "####"´date´
            echo $hr":"$mn" - "$ahr":"$amn
            /home/pi/piclck/bin/playStream.sh &
            echo on
            touch /home/pi/.alarmOn
            sleep 60
        fi 
    done 
    sleep 1
done
