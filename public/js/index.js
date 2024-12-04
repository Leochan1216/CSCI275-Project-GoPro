const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'my_database'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});
