#!/bin/bash
sudo cp buttons.service /etc/systemd/system/
sudo systemctl enable buttons.service
sudo systemctl start buttons

sudo cp alarms.service /etc/systemd/system/
sudo systemctl enable alarms.service
sudo systemctl start alarms

sudo cp piclock.service /etc/systemd/system/
sudo systemctl enable piclock.service
sudo systemctl start piclock
