# Programs that run on Rasbperry Pi goes in this directory.

## Required Hardware:

- Raspberry Pi Zero W running Raspbian
- Barcode Scanner
- OTG Cable
- Micro USB Cable


## Setup the Scanner:

- Connect to Raspberry Pi:
```c
ssh pi@raspberrypi.local
```

- Default Password:
```c
raspberry
```

- Download the scanner program:
```c
curl https://raw.githubusercontent.com/chasewalker26/COP4331_Project/main/project/RaspberryPi/scan.py -o scan.py
```

- Link your shopping list (Replace <ListID> with your own ListID):
```c
echo “ListID” >> id.txt
```

- Run the program:
```c
sudo python3 scan.py
```

