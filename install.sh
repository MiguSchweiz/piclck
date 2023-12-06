#!/bin/bash

sudo apt-get install apache2 php7.0 libapache2-mod-php mplayer git software-properties-common




# copy apache config
sudo cp 000-default.conf /etc/apache2/sites-enabled/

# setup services
sudo cp buttons.service /etc/systemd/system/
sudo systemctl enable buttons.service
sudo systemctl start buttons

sudo cp alarms.service /etc/systemd/system/
sudo systemctl enable alarms.service
sudo systemctl start alarms

sudo cp piclock.service /etc/systemd/system/
sudo systemctl enable piclock.service
sudo systemctl start piclock
