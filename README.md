# Bamazon
NodeJS CLI Driven Shopping App dependent on MySql

## Description
This application includes a the ability to select products as a customer (bamCustomer.js) and the ability to manage the product inventory (bamManager.js). 

### bamCustomer
The customer file, _bamCustomer.js_ allows you to select multiple products before entering checkout.  In the images below three products are selected.  Notice the quantity before and after checkout:

Before checkout, the database shows item_id's of 3, 6, 9, with stock_quantity values of 9, 14, and 19 respectively:
![bamCust01](https://github.com/rbaird2001/bamazon/blob/master/images/bamCust01.gif)
          
This image shows the products ordered:
![bamCust01](https://github.com/rbaird2001/bamazon/blob/master/images/bamCust03.gif)

The full process is shown here:
![bamCust01](https://github.com/rbaird2001/bamazon/blob/master/images/bamCust02.gif)

After the order, the values in the stock_quantity are reduced respective to the amount ordered. The difference in the values before and after can be seen here after the query is run a second time:
![bamCust01](https://github.com/rbaird2001/bamazon/blob/master/images/bamCust04.gif)

### bamManager
The manager file, _bamManager_ allows you to view full inventory, low inventory and to add inventory from either list. The changes are reflected in the database:
![bamCust01](https://github.com/rbaird2001/bamazon/blob/master/images/bamManager01.gif)

### Regarding Constructors and Prototypes
Beyond the use of MySql and Inquirer in this project, we also implemented constructors and prototypes as major tools. Both are designed to simplify the use of the _mysql_ and _inquirer_ node packages. Understanding how they are setup will make following this code easier.

A constructor named _MySql_ was created mainly to enable the use of a promise. _mysql_ package relies on callback functions which can be unwieldy as a program gets more complex. Instead of relying on callbacks for one module, and promises in another, we attempt to be consistent by using promises in both. The _MySql_ constructor also includes specific prototypes for select queries and execute queries (which include inserts, updates, and deletes). The select query also performs JSON commands on the results before returning them via the promise. This cleans the returned data further to be more usable.

A constructor named _Inquirer_ was created primarily to simplify the use of the rawList option in inquirer choices. It also includes prototypes for other choice options. 

The implementation of both allows the return of query to be directly added to an inquerer the choice list without having to implement loops. It also provided solid experience in using contructors and prototypes. However, in retrospect we could have extended their use further as there were multiple, nearly identical queries used that could have been made into prototypes and eased up the syntax even more.

## Made With
* MySql Server and MySql workbench.
* Node JS with supporting modules.
* Visual Studio Code


## Prerequisites
Node JS with the following npm packages:
* mysql
* inquirer
* dotenv
* clear

MySqlServer and MySqlWorkbench (or some other MySql capable client).

## Setup
1. Install Node JS to your device.
2. Install MySql Server to your Device.
3. Install MySql Workbench to your device and configure it to access your MySql Server.
4. Download respository.
5. Within MySQl Workbench, run the _seed.sql_ query file to create the _bamazon_ database and _product_ table.
6. Within MySQl Workbench, run the _data.sql_ query file to poulate the _product_ table with data.
5. run _npm install_. The _package.json_ file will have all the dependent modules and will install them for you.
6. Execute _node bamCustomer.js_ for customer product selection.
7. Execute _node bamManager.js_ for product inventory management.

## Contributions
This is a solo project.

## License
This projecut is licensed under the MIT licesnse.



