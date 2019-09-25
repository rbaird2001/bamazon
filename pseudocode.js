// # bamazonCustomer

// TODO create database with products table and the required fields. 
    // Use SQL scripts to do this. When working, save the commands in a file with a .sql extension.
        //CREATE DATABASE
        //CREATE TABLE with table name column names,datatypes, nulls allowed, default value, primary key.
        //Use mysql workbench.

// TODO Establish database connection.
    // install sql module to node.
    // setup connection to the database. In a js file.
        // require("mysql"), etc.
        // connection = mysql...look at other files

// Create function that will query the database table for products. 
    //connection.query()
    // These results need be displayed to the customer, how?
            // console.log? (need to loop through array of results and console log each one.)
            // get results into an inquirer choice for lists?

// TODO Customer needs to be able to make selection from available product. Set this up. 
    // Options?
        // inquirer prompt for product id?
            // inquirer.prompt([{}])
            /** {type:"input",
             *   message: "",
             *   name: "" */                
        // create selection list prompt?
            /** {type:"rawlist",
             *   message:""
             *   choices: this will be the challenge, how do I get the query results in here properly?} */

    // TODO install inquire for prompts.
    // TODO setup inquire prompts as needed.
    // customer needs to pick quantity. need additional inquirer prompt.

//TODO subract qty from inventory in db.








