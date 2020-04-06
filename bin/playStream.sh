#!/bin/bash
#echo >/tmp/piclck.log
#exec 2>&1 >>/tmp/piclck.log
ps -ef|grep -v grep|grep playStream|grep bash|wc -l|egrep '1$'

if [ $? -ne 0 ]; then
    exit
fi

ecnt=0


sudo echo connect 00:11:2D:5E:52:F9 |bluetoothctl

cvlc --volume-step=256 http://live.protonradio.com/ 2>&1 >/dev/null &

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
        cvlc --volume-step=256 http://live.protonradio.com/ 2>&1 >/dev/null &
        ((ecnt=ecnt+1))
    fi
    sleep 5
done
