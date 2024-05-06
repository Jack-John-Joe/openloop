#!/bin/bash
cd ./modules
java UDP-IM.class
java UDP-FF.class
python3 FTP-FF.py
cd ..
echo "Server running at port 9000, 9020. and 9050"