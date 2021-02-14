# Program Organization
**Level 1: System Context Diagram**

SimpleList's user use the SimpleList Website to view account information regarding his Shopping List, item history, and to make changes in his Shopping List. The SimpleList Website itself uses Rasberry Pi to do this, as Raspberry Pi gets information from the UPC database. The user himself uses the Scanner to send information to the Raspberry Pi, which lets Raspberry Pi know what to search for.

![System Context Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Level%201_%20System%20Context%20Diagram.png)
![Container Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Level%202_%20Container%20Diagram.png)
![Component Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Level%203%20Component%20Diagram.png)
# Code Design
![Class Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Event%20Storming%20and%20Class%20Diagrams-Class%20Diagrams.png)

|    class      | User Story    |       UUID    |
| ------------- | ------------- | ------------- |
| ShoppingList  | Given the user wants to view their list, when they go to the webpage, they can access their list on the site  | U001,U003,U004      |
| Inventory     | Given the user wants to view their list, when they go to the webpage, they can access their inventory on the site  | U017, U003,U004  |
| Contact       | Given that the user purchases the SimpleList Scanner, they will be provided with the ability to contact the developers through the web application to discuss issues they may come across     |     U014     |
| abstract List |Given that the user adds an item to their list, when they save the item, the list should show the item and the item should be added to the database| U007,U016,U008,U009 |
|  User         | Given that the user wants privacy, when they sign up for an account their information will be stored in firebase, and give them private access to the site. | U004 |
|  Product      |Given that a user wants to scan an item, when it is scanned, it should be received and translated by the raspberry pi |  U002, U011,  |
|  Scanner      |Given that the user has purchased the SimpleList Scanner, when they go to setup the system, then there should be minimal setup necessary for the user to allow easy and quick use.| U011,U012,U013    |

I added one of the User stories for refernce, and all of UUID assosciated. 

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

We know that coding guidelines should be developed with security implications in mind. Therefore, we value the privacy of our users and plan to keep their sensitive information encrypted in our servers. For instance, most of the people prefer to use the same password across their different accounts. If we choose to store their passwords in an unencrypted format, we might risk their other accounts too. In order for such cases not to occur, our first priority is to use trusted encryption libraries to safely store sensitive information in our servers.

# Performance

Performance is not a concern for this project. We are not targeting to have a massive number of users. Our service (PaaS) provider cuts down on the resources we are getting if our app does not get any requests for a preiod of time. This may cause same delays druing the loading process; however, we don’t see it as a big concern for this project.

# Scalability

For this project, we will be using a cloud service, which means that we will outsource most of the responsibilities of running and maintaining servers and databases to a third party. Therefore, we will be able to address any growth easily by upgrading the plan that we are using. However, the system is not expected to grow and we have enough resources available to implement a modest version of the project. The current limitations of the service we are using is described in the resource management section.

# Interoperability

The system is not expected to share data with other software. However, IoT devices are going to be able to update the database. Each device will have a unique id and connection to the database. They will continuously run a Python program which will allow them to stay connected with the database. If users choose to associate a device id with their accounts on the web app, their shopping list stored on our database will be modified according to the data gathered from the devices.

# Internationalization/Localization

# Input/Output

# Error Processing

SimpList will be using an API to get the details of products through their barcodes. We expect that details of many products will be in its database since they were able to gather more than 1.5 million barcode numbers from all around the world. However, we don't what to assume that our users will be scanning only the products that are in the database. Therefore, if we detect that the API fails to respond to our request, we will ask our users to manuly enter the details of the product that they wanted to add to their shopping lists.

# Fault Tolerance

# Architectural Feasibility

# Overengineering

# Build-vs-Buy Decisions

# Reuse

# Change Strategy
