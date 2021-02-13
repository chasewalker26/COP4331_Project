# Program Organization
SimpleList's user use the SimpleList Website to view account information regarding his Shopping List, item history, and to make changes in his Shopping List. The SimpleList Website itself uses Rasberry Pi to do this, as Raspberry Pi gets information from the UPC database. The user himself uses the Scanner to send information to the Raspberry Pi, which lets Raspberry Pi know what to search for.

![System Context Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Level%201_%20System%20Context%20Diagram.png)
![Container Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Level%202_%20Container%20Diagram.png)
![Component Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Level%203%20Component%20Diagram.png)
# Code Design
![Class Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Event%20Storming%20and%20Class%20Diagrams-Class%20Diagrams.png)
# Data Design

![Entity Relationship Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/ERD.jpg?raw=true)

# Business Rules

# User Interface Design

# Resource Management

## Hosting
Storage:                  10GB
Data transfer:            360MB/ day
SSL:                      yes

Database
Simultaneous connections:	100
Storage:					        1GB

UPC Database (API)
Lookups:					        100/day

The resources needed are well within the capabilities of the intended implementation environment. We have generous limits to get started. In addition, our Firebase plan can be resized according to a future need.

# Security

# Performance

# Scalability

For this project, we will be using a cloud service, which means that we will outsource most of the responsibilities of running and maintaining servers and databases to a third party. Therefore, we will be able to address any growth easily by upgrading the plan that we are using. However, the system is not expected to grow and we have enough resources available to implement a modest version of the project. The current limitations of the service we are using is described in the resource management section.

# Interoperability

The system is not expected to share data with other software. However, IoT devices are going to be able to update the database. Each device will have a unique id and connection to the database. They will continuously run a Python program which will allow them to stay connected with the database. If users choose to associate a device id with their accounts on the web app, their shopping list stored on our database will be modified according to the data gathered from the devices.

# Internationalization/Localization

# Input/Output

# Error Processing

# Fault Tolerance

# Architectural Feasibility

# Overengineering

# Build-vs-Buy Decisions

# Reuse

# Change Strategy
