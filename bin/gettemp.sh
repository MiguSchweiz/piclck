#!/bin/bash
temp=`curl -X GET -H "Accept: application/json" "https://api.openweathermap.org/data/2.5/weather?id=7287130&appid=73356ad2c25f2fed810764e8bd2c005e&units=metric" 2>/dev/null |awk -F ":" '{ print $12 }'|awk -F "," '{ print $1 }'`
echo $temp
