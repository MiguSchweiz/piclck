#!/bin/bash
#echo >/tmp/piclck.log
#exec 2>&1 >>/tmp/piclck.log
ps -ef|grep -v grep|grep playStream|grep bash|wc -l|egrep '1$'

if [ $? -ne 0 ]; then
    exit
fi

ecnt=0

st=`cat /home/pi/piclck/www/alarms | awk -F ";" '{ print $6 }'`
if [ $st -eq 1 ];then
    stat="http://stream.srg-ssr.ch/m/drs3/mp3_128"
elif [ $st -eq 2 ];then
    stat="http://stream.srg-ssr.ch/m/drsvirus/mp3_128"
elif [ $st -eq 3 ];then
    stat="http://www.tm-radio.com:8000/tribalmixes"
elif [ $st -eq 4 ];then
    stat="http://live.protonradio.com/"
elif [ $st -eq 5 ];then
    stat="/home/pi/piclck/media/buzzer.wav"
fi

sudo echo connect 00:11:2D:5E:52:F9 |bluetoothctl

cvlc --volume-step=256 --loop $stat 2>&1 >/dev/null &

sleep 5

while true; do
    sudo echo info 00:11:2D:5E:52:F9 |bluetoothctl|grep Connected|grep yes >/dev/null
    if [ $? -ne 0 ];then
        if [ $ecnt -eq 2 ];then
            echo "restart bluetooth..."
            sudo systemctl restart bluetooth
            ecnt=0
        fi
        pkill vlc
        sudo echo connect 00:11:2D:5E:52:F9 |bluetoothctl
        cvlc --volume-step=256 --loop $stat 2>&1 >/dev/null &
        ((ecnt=ecnt+1))
    fi
    sleep 5
done
