const mysql = require('mysql');

const dbconfig = {
    host: '127.0.0.1',
    user: 'test01',
    password: 'p4ssw0rd',
    database: 'goods'
};

const connection = mysql.createConnection(dbconfig);

module.exports = connection;