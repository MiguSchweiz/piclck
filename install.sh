#!/bin/bash

#enable i2c
sudo raspi-config nonint do_i2c 0
echo 'SUBSYSTEM=="i2c-dev", TAG+="systemd"' > /etc/udev/rules.d/99-i2c.rules

#install general apps
sudo apt-get install apache2 php7.0 libapache2-mod-php mplayer git

#install gh
GITHUB_CLI_VERSION=$(curl -s "https://api.github.com/repos/cli/cli/releases/latest" | grep -Po '"tag_name": "v\K[0-9.]+')
curl -Lo gh.deb "https://github.com/cli/cli/releases/latest/download/gh_${GITHUB_CLI_VERSION}_linux_armv6.deb"
sudo dpkg -i gh.deb

# install Pimoroni touchhat stuff
curl https://get.pimoroni.com/touchphat  | bash

# install Adafruit LED 
git clone https://github.com/adafruit/Adafruit_Python_LED_Backpack.git
cd Adafruit_Python_LED_Backpack/
sudo python setup.py install

# install bluetooth audio
sudo apt install pulseaudio-module-bluetooth

# copy apache config
sudo cp 000-default.conf /etc/apache2/sites-enabled/
sudo chmod -R 777 www

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

sudo systemctl daemon-reload

echo '### reboot if ready'
