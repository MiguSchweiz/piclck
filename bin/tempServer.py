#!/usr/bin/env python
import socket,subprocess

HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
PORT = 9090        # Port to listen on (non-privileged ports are > 1023)

temp = subprocess.check_output('/home/pi/piclck/bin/gettemp.sh').rstrip()
