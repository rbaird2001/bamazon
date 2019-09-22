require("dotenv")
require("./mysqlAuth")
const MySql = function (sqlStatement, sqlOptions) {
    this.sqlStatement = sqlStatement;
    this.sqlOptions = sqlOptions;
    this.mysql = require("mysql");
    this.sql = mysql.createConnection({
        host: "localhost", //Where your DB server is located localhost refers to your computer.
        port: 3306, // Your port; if not 3306. 3306 is the mysql default port for TCPIP.      
        user: mysqlAuth.auths.user, // The name of the account used to communicate with mysql. 
        password: mysqlAuth.auths.password, //add your password
        database: "bamazon"
    });
}

MySql.protoype.select = function (sqlStatement, sqlOptions) {
    return new Promise(function (resolve, reject) {
        let qry = this.sql.query(sqlStatement, sqlOptions, function (err, dataset) {
            if (err) {
                reject(err)
            } else {
                datasetStr = JSON.stringify(dataset);
                datasetPar = JSON.parse(datasetStr);
                resolve(datasetPar);
            }
        });
    });
}

MySql.prototype.update = function(sqlStatement, sqlOptions){
    return new Promise(function(resolve,reject){
        qry = this.sql.query(sqlStatement,sqlOptions,function(err){
            if(err){
                reject(err);
            }
            else{
                resolve(true);
            }
        })
    })
}

