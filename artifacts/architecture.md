# Program Organization
**Level 1: System Context Diagram**

SimpleList's user use the SimpleList Website to view account information regarding his Shopping List, item history, and to make changes in his Shopping List. The SimpleList Website itself uses Rasberry Pi to do this, as Raspberry Pi gets information from the UPC database. The user himself uses the Scanner to send information to the Raspberry Pi, which lets Raspberry Pi know what to search for.

![System Context Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Level%201_%20System%20Context%20Diagram.png)
![Container Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Level%202_%20Container%20Diagram.png)
![Component Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Level%203%20Component%20Diagram.png)
# Code Design
![Class Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Class%20Diagrams-descriptions.png)

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

![Class Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/UI%20relationship%20diagram.png)

|    UI diagram      |    User Interacion    |     UUID(s)    |
| ------------------ | --------------------- | -------------- |
| 1 | This screen shows what the user will see after submitting the clear crossed-out items dialogue box, the items will no longer be on the screen. | U003, U021 |
| 2 | This box appears when the user presses clear with specific items crossed out, saving removes them, and cancel leaves the items crossed-out on the list. | U003, U021 |
| 3 | When clicking on a red barcode displayed on the list the user will be prompted to give the item a name. This red item appears when an item is unrecognized by the barcode API. | U003 |
| 4 | This shows that when a user clicks on shopping list items they can cross/uncross them to mark them for clearing. | U003, U021 |
| 5 | This is the sign in/sign up screen using Google’s login API for security and efficiency. | U004, U005 |
| 6 | This is the shopping list screen that the user will be sent to after login and interact with. | U003 |
| 7 | This is what is shown when the user presses clear without any items crossed out. This will clear the whole list at once. | U003, U021 |
| 8 | This is what the user is shown when they want to add an item to their shopping list. | U007 |
| 9 | This is what is shown after the user clears the shopping list by using the dialogue box in 7. | U003, U021 |
| 10 | This is the shopping list template on mobile screens. | U001 |
| 11 | This is the navigation on mobile screens. | U001 |
| 12 | This is the navigation menu. Shown by clicking the hamburger, closed by clicking the X. | U001 |
| 13 | This is the contact form, it is navigated to using the nav menu. Submitting a message emails the developers. | U014 |
| 14 | This screen allows users to set custom warnings, and preferred inventory amounts for items in their inventory. This is done by clicking on an inventory item. | U008, U009, U010 |
| 15 | This is the user’s inventory screen, it is navigated to using the nav menu. | U017 |
| 16 | This is the add an item to the inventory screen opened by pressing the add button. It allows users to add items to the inventory manually. | U019 |

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

In the SimpleList Scanner system we will be using JS, Firebase, ASCII, Unix but converting to EST time, Python, and HTML. We will not have to convert to different languages since our system is only available in the US and will only recognize US-based products, as of right now. We may consider implementing website translations for prompts which would be relatively easy given Firebase’s wide-variety of add-ons to the website but it should not be necessary as we are pulling from a barcode database with specific brands and names that are straightforward and recognizable in the US. 

# Input/Output

For our system, inputs will be provided through an IoT device, the Raspberry Pi, and directly through the website. In the event of errors occurring with the scanner where it is unable to recognize a barcode when pulling from the scanner, the user will be prompted to input the corresponding name and give the user the barcode number for context. This along with providing the time of being scanned should allow the users enough information to input their items if the UPC database is unable to recognize the barcode and issues arise. Also, if an error occurs with the website, either the Inventory or ShoppingList, the user is given the ability to contact the developers as which we will have an email setup to receive and help solve any issues. Usually issues will likely be able to be solved on the backend as this product will be online and allow for easy alteration by developers if it is a software issue. Issues that may arise with the IoT device would require more in-depth customer service interaction between developer and user. 

# Error Processing

SimpleList will be using an API to get the details of products through their barcodes. We expect that details of many products will be in its database since they were able to gather more than 1.5 million barcode numbers from all around the world. However, we don't what to assume that our users will be scanning only the products that are in the database. Therefore, if we detect that the API fails to respond to our request, we will ask our users to manuly enter the details of the product that they wanted to add to their shopping lists.

# Fault Tolerance

# Architectural Feasibility

For this project the system includes a combination of an IoT device, HTML website created using Firebase, and using the UPC database to collect data for each users’ product database. In determining how to implement our plan, we found multiple similar examples but none that matched ours exactly. For simplicity, we decided to use a UPC database for the barcode conversions as it was unrealistic for us to create our own larger database to pull from as attempting to find all of the possible barcode combinations and look up their correlations would be less than ideal for the time period we have to make the scanner. Also, we chose to include systems that allow the user to have periodical reminders as it is impossible for users to scan items such as produce. It’s important that the user can have full use of the app even if they can’t scan something so full access to editing and adding to the list is also necessary. The architecture can be deemed as feasible with the implementation of a few pre-existing softwares as we are able to create a working system by connecting the raspberry pi to an online database and having the system automatically update as the user needs. 

# Overengineering

In our project we stayed on the side of simplicity for our classes in order to allow for easy to read code and easily identifiable systems. We have 7 classes, each that are for specific parts of the system. For example, our scanner class is in fact more convoluted as it pulls from the database once and adds it to a local database to allow the website to have to do minimal work and reduce the number of times the system is required to pull from the UPC database. Also, ShoppingList and Inventory are children of the larger List class to allow for when altering anything between the ShoppingList and Inventory it is easily identifiable but allow for them to pull from the same overall list class to allow for minimal discrepancies between the two. We’ve allowed for each class to interact with one another but attempted to do minimal nesting of classes to allow for less convolution and expect less errors and dependencies within our system. In each section we will be implementing try-catch statements to allow the system to continue to work despite issues that may arise and the user may contact us through the contact page to fix possible issues they may come across.

# Build-vs-Buy Decisions

UPC Database
Firebase
We chose to use the resources of Firebase to create a custom website from scratch rather than using a template because it allows for us to create a minimal and easy-to-use website as well as add a database that can connect to the raspberry pi. Also, we chose to build these parts rather than buying as it gave more originality to our project by allowing us more free will to alter aspects of our project that if purchasing or using already made software would make it much more difficult to alter. We also decided to purchase a scanner to break down and a raspberry pi to save time as it already includes the necessary hardware components to put the system together. Overall, building the majority of our project was necessary to simplify the process and limit possible issues that may arise.

# Reuse

Our HTML website, IoT device system and database of inventory will all be created and customized to the users’ and developers’ needs. In this case the only pre-existing software that we plan to utilize includes the google sign-in option for firebase and the UPC database website. The use of google sign-in would allow for easy and secure access for the user and allow for a more individualized login system that already has a fail-safe in place. We also chose to use the UPC database as it would be more realistic to pull product information directly from a more universally-used and updated database as it is not feasible to create a comprehensive barcode database of our own in the short time period of 8 weeks. 

# Change Strategy

# General Architecture Quality

