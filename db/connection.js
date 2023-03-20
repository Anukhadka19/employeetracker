// Import and require mysql2
const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({ 
    host:"localhost",
    user:"root",
    password:process.env.DB_PASSWORD,
    database:"employee_db"
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Success");

})

module.exports = connection