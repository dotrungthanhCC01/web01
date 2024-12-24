// config/db.js
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'dothanh',
  password: '123456',
  database: 'todolist_app'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
