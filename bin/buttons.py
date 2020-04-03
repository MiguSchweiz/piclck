#!/usr/bin/env python

import signal
import time
import os

import touchphat


for pad in ['Back','A','B','C','D','Enter']:
    touchphat.set_led(pad, True)
    time.sleep(0.1)
    touchphat.set_led(pad, False)
    time.sleep(0.1)

@touchphat.on_touch('Enter')
def handle_touch(event):
	os.system('/home/pi/piclck/bin/lightsoff.sh')
	touchphat.set_led(event.name, False)
	
    
@touchphat.on_touch('D')
def handle_touch(event):
        os.system('/home/pi/piclck/bin/playStream.sh')
        touchphat.set_led(event.name, False)

@touchphat.on_touch('A')
def handle_touch(event):
        os.system('/home/pi/piclck/bin/alarmctl.sh stop')
        touchphat.set_led(event.name, False)

@touchphat.on_touch('Back')
def handle_touch(event):
        os.system('/home/pi/piclck/bin/alarmctl.sh slum')
        touchphat.set_led(event.name, False)

signal.pause()
