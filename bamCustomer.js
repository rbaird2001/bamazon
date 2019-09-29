
const MySql = require("./MySql"); //converts the mysql node to support promise and cleans up the returned data to be more user freindly
const sql = new MySql(); 
const Inquirer = require("./Inquirer"); //Attempt to simplify the inquirer process.
const clear = require("clear") //Clears the screen to be more user friendly.
const shopCart = []

initShopping();
function initShopping() {
    let selProduct = {}
    sql.select("SELECT CONCAT(product_name,' -- ', department_name, ' -- ', price, ' -- ', stock_quantity, ' grams') as name,item_id as value from products WHERE stock_quantity > 0", "")
        .then(
            function (dataset) {
                //console.log(dataset);
                clear();
                let inq = new Inquirer();
                //insert the sql results into a numbered list
                inq.rawList(dataset, "\n\nMake your selection from the following options:")
                    .then(function (resp) {
                        //console.log(resp);
                        //select detail of the selected product.
                        sql.select("select * from products where item_id = ?", resp.choice)
                            .then(function (dataset) {
                                selProduct = dataset[0];
                                //console.log(selProduct);
                                //Return the product detail in a user friendly format.
                                clear();
                                console.log(`You selected ${selProduct.product_name} -- ${selProduct.department_name}.`)
                                console.log(`   The current price is: ${selProduct.price}`);
                                console.log(`   The current quantity is: ${selProduct.stock_quantity} grams`);
                                console.log(`___________ \n\n`);
                                inq.numInput("Enter your desired amount. Amount cannot exceed available quantity.")
                                    .then(function (resp) {
                                        //console.log(resp);
                                        if (resp.number < 1) {
                                            clear();
                                            console.log("You have selected zero grams ");
                                            console.log("Nothing will be added to your cart.");
                                            console.log("\n\n");
                                            continueShopping()
                                        }
                                        let inventoryDemand = selProduct.stock_quantity - resp.number;
                                        //console.log(inventoryDemand < 0);
                                        if (inventoryDemand < 0) {
                                            clear();
                                            console.log("The amount requested exceeds inventory. We will add the available quantity to your cart.");
                                            selProduct.cartNumber = selProduct.stock_quantity
                                        }
                                        else {
                                            clear();
                                            selProduct.cartNumber = resp.number;
                                        }
                                        //console.log(selProduct);
                                        shopCart.push(selProduct);
                                        console.log(`__________\n\n\n`);
                                        console.log(`${selProduct.cartNumber} grams of ${selProduct.product_name} have been added to your cart.`);
                                        console.log(`_________\n\n`);
                                        continueShopping();
                                    })
                                    .catch(function (err) {
                                        throw (err);
                                    });
                            })
                            .catch(function (err) {
                                console.log(err);
                                throw (sql.sql.query().sql);
                            })
                    }
                    )
                    .catch(function (rej) {
                        console.log("Rejected: ", rej);
                        throw (rej);
                    }
                    );
            });
}

//Allow customers to shop for multple products
const continueShopping = function () {
    let choices = [
        {
            name: "Keep shopping.",
            value: "shop"
        },
        {
            name: "Go to checkout.",
            value: "checkout"
        }
    ]
    let inq = new Inquirer();
    inq.rawList(choices, "What would you like to do next?")
        .then(function (resp) {
            //console.log(resp);
            if (resp.choice === "shop") {
                initShopping();
            }
            else {
                orderProcess();
            }
        })
}

orderProcess = function () {
    clear();
    console.log("Your order has been successfuly processed.")
    console.log("You have ordered the following:")
    for (let i = 0; i < shopCart.length; i++) {
        let updateStock = [
            { stock_quantity: shopCart[i].stock_quantity - shopCart[i].cartNumber },
            { item_id: shopCart[i].item_id }
        ]
        sql.execute("UPDATE products SET ? Where ?", updateStock)
            .then(function () {
                console.log(`     ${shopCart[i].cartNumber} grams of ${shopCart[i].product_name}`)
                if(i+1 === shopCart.length){
                    console.log("\n\n");
                    sql.sql.end();
                }
            })
            .catch(function (err) {
                console.log(err);
                sql.sql.end()
                return false
            })
    }
}
