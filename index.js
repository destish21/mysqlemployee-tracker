const inquirer = require('inquirer')
const mysql = require('mysql')
const myTable = require('console.table');

// Creating a connection between database and localhost using port 3306
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12#root2021',
    database: 'employee_trakerDB'

});
//creating connection using a specific threadId to run startProgram function
connection.connect(err => {
    if(err)throw err;
    console.log(`connecte to mysql on thread${connection.threadId}`)
    // startPrompt()
});

