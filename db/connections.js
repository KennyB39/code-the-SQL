const util = require('util');
const mysql2 = require('mysql2');
const connect = mysql2.createConnection({
    host: 'localHost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
});

connect.query = util.promisify(connect.query)

module.exports = connect;