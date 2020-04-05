#!/bin/bash
echo >/tmp/piclck.log
exec 2>&1 >>/tmp/piclck.log

ps -ef|grep -v grep|grep playStream|wc -l|grep 1

if [ $? -ne 0 ]; then
    exit
fi

date

sudo echo connect 00:11:2D:5E:52:F9 |bluetoothctl

cvlc --volume-step=256 http://live.protonradio.com/ 2>&1 >>/tmp/piclck.log &

sleep 5

while true; do
    sudo echo info 00:11:2D:5E:52:F9 |bluetoothctl|grep Connected|grep yes >/dev/null
    if [ $? -ne 0 ];then
        pkill vlc
        sudo echo connect 00:11:2D:5E:52:F9 |bluetoothctl
        cvlc --volume-step=256 http://live.protonradio.com/ 2>&1 >>/tmp/piclck.log &
    fi
    sleep 5
done
