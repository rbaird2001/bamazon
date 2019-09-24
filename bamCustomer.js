
const MySql = require ("./MySql");
const testsql = new MySql();
const Inquirer = require("./Inquirer");

testsql.select("select product_name as name,item_id as value from products","")
    .then(
        function(dataset){
            console.log(dataset);
            let inq = new Inquirer();
            let prodID = null
            inq.rawList(dataset,"Make your selection from the following options:")
                .then(function(resp){
                    prodID = resp
                    console.log(prodID)
                    inq.numInput("Enter your desired amount. Amount cannot exceed available quantity.")
                      .then(function(resp){
                          console.log(resp);
                      })
                })
                    // .then(function(resp){
                    //     console.log(resp)
                    // })
        }
    )
    .catch(function(rej){
        console.log("Rejected: ",rej);
    }
);


