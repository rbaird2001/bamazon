const inquirer = require("inquirer");
const Inquirer = function(){}

Inquirer.prototype.rawList = function(choiceArray,question){
    return inquirer.prompt([{
    type:"rawlist",
    name: "choice",
    message: question,
    choices: choiceArray,
    }])
}

Inquirer.prototype.numInput = function(question){
    return inquirer.prompt([{
        type:"number",
        name:"number",
        message: question,
    }])
}

Inquirer.prototype.confirm = function(question){
    return inquirer.prompt([{
        type:"confirm",
        name:"confirm",
        message: question,
    }])
}



module.exports = Inquirer