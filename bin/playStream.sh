#!/bin/bash
#echo >/tmp/piclck.log
#exec 2>&1 >>/tmp/piclck.log
ps -ef|grep -v grep|grep playStream|grep bash|wc -l|egrep '1$'

if [ $? -ne 0 ]; then
    exit
fi


ecnt=0

st=`cat /home/pi/piclck/www/alarms | awk -F ";" '{ print $6 }'`
if [ "$1" != "" ];then
    st=1
fi
if [ $st -eq 1 ];then
    stat="http://stream.srg-ssr.ch/m/drs3/mp3_128"
elif [ $st -eq 2 ];then
    stat="http://stream.srg-ssr.ch/m/drsvirus/mp3_128"
elif [ $st -eq 3 ];then
    stat="http://www.tm-radio.com:8000/tribalmixes"
elif [ $st -eq 4 ];then
    stat="https://shoutcast.protonradio.com/"
elif [ $st -eq 5 ];then
    stat="/home/pi/piclck/media/buzzer.wav"
fi

mplayer -cache 512 -loop 0 $stat 2>&1 >/dev/null &

