#!/usr/bin/python

import time
import datetime,socket

from Adafruit_LED_Backpack import SevenSegment, AlphaNum4

IP = '127.0.0.1'    # The remote host
PORT = 9090           # The same port as used by the server





segment = SevenSegment.SevenSegment(address=0x70)
display = AlphaNum4.AlphaNum4(address=0x70,busnum=1)
display.begin()
# Initialize the display. Must be called once before using the display.
segment.begin()
segment.set_brightness(0)

def isOpen(ip,port):
   s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
   try:
      s.connect((ip, int(port)))
      s.shutdown(2)
      return True
   except:
      return False

def getData():
    data=""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((IP, int(PORT)))
        s.send(b'11111111')
        data=s.recv(1024)
        display.clear() 
        display.print_str(data.decode()[0:4])
        display.write_display()
        time.sleep(0.5)
        data = s.recv(1024)
        s.close()
    except(socket.error):
        data="error" 
    return data 

# Continually update the time on a 4 char, 7-segment display
while(True):
    data=""
    data=getData()
    if not data=="error" :
        segment.clear() 
        segment.print_float(float(data), decimal_digits=1)
        segment.write_display()
        time.sleep(3)
    else:
        now = datetime.datetime.now()
        hour = now.hour
        minute = now.minute
        second = now.second
        
        segment.clear()
        # Set hours
        segment.set_digit(0, int(hour / 10))     # Tens
        segment.set_digit(1, hour % 10)          # Ones
        # Set minutes
        segment.set_digit(2, int(minute / 10))   # Tens
        segment.set_digit(3, minute % 10)        # Ones
        # Toggle colon
        segment.set_colon(second % 2)              # Toggle colon at 1Hz

        # Write the display buffer to the hardware.  This must be called to
        # update the actual display LEDs.
        segment.write_display()

        # Wait a quarter second (less than 1 second to prevent colon blinking getting$
        time.sleep(0.15)



