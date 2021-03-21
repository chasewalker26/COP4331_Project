Programs that run on Rasbperry Pi goes in this directory.

## Required Hardware:

— Raspberry Pi Zero W running Raspbian
— Barcode Scanner
— OTG Cable
— Micro USB Cable


## Setup the Scanner:

— Connect to Raspberry Pi:
```c
ssh pi@raspberrypi.local
```

— Default Password: raspberry

— Download the scanner file: curl https://raw.githubusercontent.com/chasewalker26/COP4331_Project/main/project/RaspberryPi/scan.py -o scan.py

— Link your shopping list: echo “userTest” >> id.txt (Replace <userTest> with your own ListID)

— Run the program: sudo python3 scan.py
