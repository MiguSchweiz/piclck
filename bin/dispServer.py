#!/usr/bin/env python
import socket,subprocess,sys

HOST = '127.0.0.1'
PORT = 9090

send = subprocess.check_output('/home/pi/piclck/bin/gettemp.sh').rstrip()
if len(send)==0:
    send=b'999.9'

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen(2)
conn, addr = s.accept()
data=b'1'
while 1:
        try:
            data = conn.recv(1024)
            conn.send(send)
            break
        except():
            break
    
