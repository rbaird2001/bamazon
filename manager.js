
const MySql = require("./MySql"); //converts the mysql node to support promise and cleans up the returned data to be more user freindly
const Inquirer = require("./Inquirer"); //preformats most common prompts
const inqPrompts = require("./InquirerPrompts") //holds Inquirer choices that do not come from mysql query results.
const sql = new MySql();
const inq = new Inquirer();


// console.log(inqPrompts.mgrTodo);
// console.log(inqPrompts.custShop);
// console.log(inq.rawList);

initManager = function(){
    inq.rawList(inqPrompts.mgrTodo,"What do you want to do?")
    .then(function(resp){
        console.log(resp);
        switch(resp.choice){
            case 1 : fullInventory()
            break;

            case 2 : lowInventory()
            break;

            default: break;
        }
    })
    .catch(function(err){throw console.log(err)})
};


function fullInventory(){
    sql.select("SELECT item_id as value, CONCAT(product_name, ' -- ',department_name,' -- ',price,' -- Qty: ', stock_quantity) as name FROM products WHERE department_name !='Charity' ")
    .then(function(dataset){
        //console.log(dataset);
        inq.rawList(dataset,"Full Inventory: ")
        })
    .catch(function(err){console.log(err)})
}

function lowInventory(){
    let productid = null
    sql.select("SELECT item_id as value, CONCAT(product_name, ' -- ',department_name,' -- ',price,' -- Qty: ', stock_quantity) as name FROM products WHERE department_name !='Charity' and stock_quantity < 6 ")
    .then(function(dataset){
        console.log("Products with 5 or less grams in stock");
        inq.rawList(dataset,"Select from this list to manage product: ")
        .then(function(resp){
            manageProductOptions(resp.choice);
        })
            .catch(function(err){console.log(err)});
        })
        .catch(function(err){console.log(err)});
    }

function manageProductOptions(productId){
    inq.rawList(inqPrompts.prodManageOpt,"What would you like to do with this product?")
    .then(function(resp){
    switch(resp.choice){
        case 1: addInventory(productId);
        break;

        case 2: removeProduct(productId);
        break;

        default: sql.sql.end();
        break;
    }
});
}

function addInventory(productId){
    
}

initManager();