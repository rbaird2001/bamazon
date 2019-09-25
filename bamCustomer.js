
const MySql = require("./MySql");
const sql = new MySql();
const Inquirer = require("./Inquirer");
const shopCart = []

initShopping = function () {
    let selProduct = {}
    sql.select("select product_name as name,item_id as value from products", "")
        .then(
            function (dataset) {
                //console.log(dataset);
                let inq = new Inquirer();

                inq.rawList(dataset, "Make your selection from the following options:")
                    .then(function (resp) {
                        //console.log(resp);
                        sql.select("select * from products where item_id = ?",resp.choice)
                            .then(function (dataset) {
                                selProduct = dataset[0];
                                //console.log(selProduct);
                                console.log(`You selected ${selProduct.product_name} -- ${selProduct.department_name}.`)
                                console.log(`   The current price is: ${selProduct.price}`);
                                console.log(`   The current quantity is: ${selProduct.stock_quantity}`);
                                console.log(`___________ \n`);
                                inq.numInput("Enter your desired amount. Amount cannot exceed available quantity.")
                                    .then(function (resp) {
                                        //console.log(resp);
                                        let inventoryDemand = selProduct.stock_quantity - resp.number;
                                        inventoryDemand > 0 ? true : console.log("The amount requested exceeds inventory. We will add the available quantity to your cart.");
                                        inventoryDemand > 0 ? selProduct.cartNumber = resp.number : selProduct.cartNumber = selProduct.stock_quantity;
                                        //console.log(selProduct);
                                        shopCart.push(selProduct);
                                        console.log(`__________\n\n\n`);
                                        console.log(`${selProduct.cartNumber} grams of ${selProduct.product_name} have been added to your cart.`);
                                        console.log(`_________\n\n`);
                                        continueShopping();
                                    })
                                    .catch(function(err){
                                        throw(err);
                                    });
                            })
                            .catch(function(err){
                                console.log(err);
                                throw(sql.sql.query().sql);
                            })
                    }
                    )
                    .catch(function (rej) {
                        console.log("Rejected: ", rej);
                        throw(rej);
                    }
                    );
            });
}

const continueShopping = function(){
    let choices = [
        {
        name:"Keep shopping.",
        value:true
        },
        {
            name:"Go to checkout.",
            value:false
        }
    ]
    let inq = new Inquirer();
    inq.rawList(choices,"What would you like to do next?")
        .then(function(resp){
            console.log(resp);
            if(resp.choice === true){
                initShopping();
            }
            else{
                orderProcess();
            }
        })
}

orderProcess = function (){
    for(let i=0;i<shopCart.length;i++){
        let updateStock = [
            {stock_quantity: shopCart[i].stock_quantity - shopCart[i].cartNumber},
            {item_id:shopCart[i].item_id}
        ]
        sql.execute("UPDATE products SET ? Where ?",updateStock)
            .then(function(){
                console.log("Your order has been successfully processed."); 
                sql.sql.end();
            })
            .catch(function(err){
                console.log(err);
                sql.sql.end()
            })
    }      
}
initShopping();
