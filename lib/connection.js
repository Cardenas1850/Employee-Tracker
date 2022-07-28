// get the client
const mysql = require('mysql2');
const util = require('util');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'PUT YOUR USERNAME HERE',
  password: 'PUT PASSWORD HERE',
  database: 'employees_db'
},
console.log("Connected to database")

);

connection.query = util.promisify(connection.query);

module.exports = connection;