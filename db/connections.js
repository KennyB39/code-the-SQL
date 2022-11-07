const util = require('util');
const mysql2 = require('mysql2');
const connect = mysql.connection({
    host: 'localHost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
});

connect.query = util.promisify(connect.query)

module.exports = connect;