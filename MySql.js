let dotenv = require("dotenv");
let mysqlAuth = require("./mysqlAuth");
const mysql = require("mysql");

const MySql = function () {
    this.sql = mysql.createConnection({
        host: "localhost", //Where your DB server is located localhost refers to your computer.
        port: 3306, // Your port; if not 3306. 3306 is the mysql default port for TCPIP.      
        user: "root", // The name of the account used to communicate with mysql. 
        password: "KrazyGlu3", //add your password
        database: "bamazon"
    });
}

MySql.prototype.select = function (sqlStatement, sqlOptions) {
    return new Promise((resolve, reject) => {
        this.sql.query(sqlStatement, sqlOptions,(err, dataset) => {
            if (err) {
                return reject(err, qry)
            } else {
                datasetStr = JSON.stringify(dataset);
                datasetPar = JSON.parse(datasetStr);
                return resolve(datasetPar);
            }
        });
    });
}

MySql.prototype.execute = function(sqlStatement, sqlOptions){
    return new Promise((resolve,reject) => {
        this.sql.query(sqlStatement,sqlOptions,function(err){
            if(err){
                reject(err);
            }
            else{
                resolve(true);
            }
        })
    })
}

module.exports = MySql