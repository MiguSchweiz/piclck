#!/bin/bash
arg=$1
#temp=`curl -X GET -H "Accept: application/json" "https://api.openweathermap.org/data/2.5/weather?id=7287130&appid=73356ad2c25f2fed810764e8bd2c005e&units=metric" 2>/dev/null |awk -F ":" '{ print $12 }'|awk -F "," '{ print $1 }'`
if [ "$arg" == 'indoor' ]; then
  curl -m 5 -X GET -H "Accept: application/json" "https://api.thingspeak.com/channels/325562/fields/1.json?results=1" 2>/dev/null |awk -F'field1' '{ print $3 }'|awk -F'"' ' { print $3 }'
else
  curl -m 5 -X GET -H "Accept: application/json" "https://meteotest.ch/actions/mdxConnector/mdx/ortswetter?value=7550&name=Scuol&type=zip" 2>/dev/null | awk -F":" '{print $3 }'|awk -F "," '{ print $1 }'
fi
