const mysql = require("mysql2")

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"u22",
    multipleStatements: true

})

module.exports = connection