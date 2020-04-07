#!/usr/bin/env python
import socket,subprocess,sys

HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
PORT = 9090        # Port to listen on (non-privileged ports are > 1023)


#if sys.argv:
send = subprocess.check_output('/home/pi/piclck/bin/gettemp.sh').rstrip()

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen(2)
conn, addr = s.accept()
print 'Connected by', addr
data="Nope"
while 1:
        data = conn.recv(1024)
        conn.send(send)
