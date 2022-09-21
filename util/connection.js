// dependencies
const mysql = require("mysql2");
require('dotenv').config();

// connect the database
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER, // pull from .env
    password: process.env.DB_PASSWORD, // pull from .env
    database: 'team'
});

// export
module.exports = db;