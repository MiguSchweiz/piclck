#!/bin/bash
for i in 3 4 5 6 7 8 9 13 
do
	curl -X PUT -H 'Content-Type: application/json' -d '{"on":false}' 'http://192.168.1.127/api/jDBPGOU6akQLR6-Ypd-g60Ph2l2iRxyBEvwESeLg/lights/'$i'/state'
        sleep 0.1
done
