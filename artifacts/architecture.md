# Program Organization
**Level 1: System Context Diagram**

The SimpleList website is used to allow users to view their shopping list, inventory, and to make edits to their list and inventory. The site receives it's information from a database that stores items received from a Raspberry Pi. To send items to the database the Raspberry Pi translates barcodes it scans with the UPC database API. The Raspberry Pi receives barcodes from the scanner device activated by the user. This process allows the item(s) to be displayed on the site.

![System Context Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Level%201_%20System%20Context%20Diagram.png?raw=true)

**Level 2: Container Diagram**

This is a Container Diagram that shows that the SimpleList's Website is made up of four containers: a Web-Application, Single-Page Application, an API Application, and a Main User Database. A Web Application is an (HTML/CSS/JS) web application that simply serves static content including content that makes up the Single-Page Application. The Single-Page Application is an angular application that runs in the user's webbrowser that provides all of the SimpleList's features.

Sigle-Page Application uses JSON/HTTPS API, which is provided by API application running on the server. The API Application gets user information from the Main User Database and from UPC Database by using Raspberry Pi. User could use a Scanner to modify the database.

![Container Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Level%202_%20Container%20Diagram.png?raw=true)

**Level 3: System Component Diagram**

Here, we have Buttons Component that provide user an access to do different possible actions on the website, and there's a Design Component that let's the user see the design of the website.

Then, we see  Web Application container that has a Main Page which let's the user go to different pages on the website, so that the user can use the Web Application which uses the Pages "Database" that stores information with different links to all pages of the web application so the user can go to Other Pages.

Then we have 3 Controllers providing access points for the JSON/HTTPS API, with each controller using other components to access data from the Main User Database, and by using Raspberry Pi which needs a scanner to start making API calls to the UPC Database. Also, Security Component that provides functionality with signing in uses User ID Component form The Main User Database which stores all user IDs and information related to each user ID and uses User's Name Component which stores all user names, User's Shopping List Components which stores the Current Shopping list of the user, User's Password Component that stores passwords of each user, and User's Items Component which stores information about the items user added/deleted from his shopping list.

![Component Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Level%203_%20Component%20Diagram(new).png)

# Code Design
![Class Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Class%20Diagrams-descriptions.png?raw=true)

|    class      | User Story    |       UUID    |
| ------------- | ------------- | ------------- |
| ShoppingList  | Given the user wants to view their list, when they go to the webpage, they can access their list on the site  | U001,U003,U004      |
| Inventory     | Given the user wants to view their list, when they go to the webpage, they can access their inventory on the site  | U017, U003,U004  |
| Contact       | Given that the user purchases the SimpleList Scanner, they will be provided with the ability to contact the developers through the web application to discuss issues they may come across     |     U014     |
| abstract List |Given that the user adds an item to their list, when they save the item, the list should show the item and the item should be added to the database| U007,U016,U008,U009 |
|  User         | Given that the user wants privacy, when they sign up for an account their information will be stored in firebase, and give them private access to the site. | U004 |
|  Product      |Given that a user wants to scan an item, when it is scanned, it should be received and translated by the raspberry pi |  U002, U011,  |
|  Scanner      |Given that the user has purchased the SimpleList Scanner, when they go to setup the system, then there should be minimal setup necessary for the user to allow easy and quick use.| U011,U012,U013    |

I added one of the User stories for reference, and all of the UUIDs assosciated. 

# Data Design

![Entity Relationship Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/Entity%20Relationship%20Diagram.jpg?raw=true)

# Business Rules

The only business rule that defines architectural processes is the requirement that information on the website that is seen by the users always matches the information in the database. This rule required the design of our methods for list creation to always be ready for information in the database to be updated to provide the user with the most current information available.

# User Interface Design

![Class Diagram](https://github.com/chasewalker26/COP4331_Project/blob/main/artifacts/images/UI%20relationship%20diagram.png?raw=true)

|    UI diagram      |    User Interaction    |     UUID(s)    |
| ------------------ | ---------------------- | -------------- |
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

### Hosting
Storage:                  10GB
Data transfer:            360MB/ day
SSL:                      yes

### Database
Simultaneous connections:	100
Storage:					        1GB

### UPC Database (API)
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

Internationalization will not be needed for our system. The system will only be available in the United States, and all resources used will be effective for this locale. Any times shown on the site will be shown in standard EST time for the purposes of the project. Since the UPC database contains items that are recognizable to those in the US no processing will need to be done to those items.

# Input/Output

For our system, inputs will be provided through an IoT device, the Raspberry Pi, and directly through the website. In the event of errors occurring with the scanner where it is unable to recognize a barcode when pulling from the scanner, the user will be prompted to input the corresponding name and give the user the barcode number for context. This along with providing the time of being scanned should allow the users enough information to input their items if the UPC database is unable to recognize the barcode and issues arise. Also, if an error occurs with the website, either the Inventory or ShoppingList, the user is given the ability to contact the developers as which we will have an email setup to receive and help solve any issues. Usually issues will likely be able to be solved on the backend as this product will be online and allow for easy alteration by developers if it is a software issue. Issues that may arise with the IoT device would require more in-depth customer service interaction between developer and user. 

# Error Processing

Error processing in our system will take a detective approach. When errors are found a program will notify the user and prevent whatever action caused the error from completing. The detection of these errors will be active, with validation of all user inputs to prevent a broken system state or invalid database submissions. Exceptions can be thrown by invalid input and caught to check for what error message to display to the user, so that the user can correct their input. On the site most errors should be displayed in red text above the interactive element responsible for the error if it came from user input. The program should discard all errors that do not break the system state, and repair errors that do. These should generally be repaired with a system refresh/reset. All input data will be assumed dirty and will be checked and processed by the class that it belongs to. This will allow specific processing for many types of user input that vary between each class. All error handling will be done using Javascript, JQuery, and Pythons native error handling implementations.


# Fault Tolerance

When the UPC database cannot recognize an item, instead of ignoring the item, it will be shown on the site as a barcode for the user to name. This will prevent system failure from an unnameable barcode affecting the raspberry pi code or the database items. To prevent sign in errors the team chose to use Google sign-in for its reliability and built-in password reset functionalities. The raspberry pi will be able to detect a system failure error and reboot itself should one occur to prevent an infinite state of unusability. 

# Architectural Feasibility

For this project the system includes a combination of an IoT device, HTML website created using Firebase, and using the UPC database to collect data for each users’ product database. In determining how to implement our plan, we found multiple similar examples but none that matched ours exactly. For simplicity, we decided to use a UPC database for the barcode conversions as it was unrealistic for us to create our own larger database to pull from as attempting to find all of the possible barcode combinations and look up their correlations would be less than ideal for the time period we have to make the scanner. Also, we chose to include systems that allow the user to have periodical reminders as it is impossible for users to scan items such as produce. It’s important that the user can have full use of the app even if they can’t scan something so full access to editing and adding to the list is also necessary. The architecture can be deemed as feasible with the implementation of a few pre-existing softwares as we are able to create a working system by connecting the raspberry pi to an online database and having the system automatically update as the user needs. 

# Overengineering

In our project we stayed on the side of simplicity for our classes in order to allow for easy to read code and easily identifiable systems. We have 7 classes, each that are for specific parts of the system. For example, our scanner class is in fact more convoluted as it pulls from the database once and adds it to a local database to allow the website to have to do minimal work and reduce the number of times the system is required to pull from the UPC database. Also, ShoppingList and Inventory are children of the larger List class to allow for differences in the two lists to be handled by their own object, but allows them to retain common features. We’ve allowed for each class to interact with one another but attempted to do minimal nesting of classes to allow for less convolution and expect less errors and dependencies within our system. In each section we will be implementing try-catch statements to allow the system to continue to work despite issues that may arise and the user may contact us through the contact page to fix possible issues they may come across.

# Build-vs-Buy Decisions

We chose to create a custom website rather than use a template because it allows for us to create a minimal and easy-to-use website as well as easily add our own database connection for the site’s main functionality. We also chose building over buying as it gave more freedom and customization for our project.
The website will utilize Bootstrap for it’s built-in portability, classes, and column system that will allow for a responsive page that still guarantees the developers creative freedom and provides fast development. 
We decided to purchase the scanner and raspberry pi to save time as it already includes the necessary hardware components to put the system together, while remaining a lower cost than prebuilt systems that exist such as Genican.
We are using the UPC database API to translate our barcodes to english because it would be near impossible for our team to create our own database of barcodes as thorough as the APIs, and it would be marginally more expensive.
For user sign-in and account management we chose Google’s sign-in API that provides better security and ease than a built approach would at no cost to the developers.

# Reuse

Our HTML website, IoT device system and database of inventory will all be created and customized to the users’ and developers’ needs. In this case the only pre-existing software that we plan to utilize includes the google sign-in option for firebase and the UPC database website. The use of google sign-in would allow for easy and secure access for the user and allow for a more individualized login system that already has a fail-safe in place. We also chose to use the UPC database as it would be more realistic to pull product information directly from a more universally-used and updated database as it is not feasible to create a comprehensive barcode database of our own in the short time period of 8 weeks. 

# Change Strategy

Some changes that we’ve considered for the architecture includes giving the possibility of having the option to create separate lists per household. This could be implemented through unique QR codes that can be developed to be scanned first correlating to separate lists. Also we’ve discussed attempting to create or find a larger barcode database that could allow for international use. To implement this we’d have to find a larger database or create our own barcode database to link our product database that has a larger barcode inventory than the original UPC database or possibly check multiple databases and implement them as fail-safes. Based on our class setups, changes are more likely to occur in the backend through the Scanner class if we’re changing which database it pulls from, and if we are changing the user information we would solely have to update the user class to add sub-users. Most changes depending on the focus are expected to only require us to update one or two classes for the changes to be implemented.


# General Architecture Quality

The architecture handles all requirements and user stories that define our project and system. It has been designed specifically to meet the requirements and the developers will not build more or less than what is required to meet the needs of the users.
The architecture is conceptually coherent and fits together in a way that is logical, practical, and implementable.
The top level design is largely independent of language and machine except for a few exceptions.A website must be made with HTML and CSS which is system independent, but is a requirement that the system was designed around as a website was the user’s request. All other languages used do not force system dependency and the architecture was designed to allow the use of any language outside of web-specific languages.
All motivations for major decisions not solely influenced by user stories have been provided in this document. There is a clear understanding about the choices made and the influences that helped the developers make them. The classes have been defined and described to a level that all developers understand and find feasible and achievable.


