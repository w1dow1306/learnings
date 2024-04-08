const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpass,
    database:'test'
});

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
};

module.exports = { query };
