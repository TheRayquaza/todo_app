#!/bin/sh
echo "1. API"
cd server/
sudo node dist/app.js &
echo "2. Apache"
sudo service apache2 start
