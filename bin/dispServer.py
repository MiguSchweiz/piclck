#!/usr/bin/env python
import socket,subprocess,sys

indoor=False
d='O   '
if len(sys.argv)>1:
  arg=sys.argv[1]
  if arg == 'indoor':
    indoor=True
    d='1   '
  
HOST = '127.0.0.1'
PORT = 9090

def getTemp(indoor):
  if indoor:
    send = subprocess.check_output(['/home/pi/piclck/bin/gettemp.sh','indoor']).rstrip()
  else:
    send = subprocess.check_output('/home/pi/piclck/bin/gettemp.sh').rstrip()

  if len(send)==0:
    send=b'999.9'
  
  return send

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen(2)
conn, addr = s.accept()
data=b'1'
while 1:
        try:
            data = conn.recv(1024)
            conn.send(bytes(d,'ascii'))
            conn.send(getTemp(indoor))
            break
        except():
            break
    
