#!/bin/bash
sudo cp buttons.service /etc/systemd/system/
sudo systemctl enable buttons.service
sudo systemctl start buttons
