// Import dependencies at the top
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config(); // For local development

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL Configuration
const mysqlConfig = functions.config().mysql || {
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'csci275-project-gopro',
  host: process.env.MYSQL_HOST || '34.121.168.92',
  port: 3306,
};

// Adjust dbConfig accordingly
const dbConfig = {
  host: mysqlConfig.host || process.env.MYSQL_HOST || 'localhost',
  user: mysqlConfig.user || process.env.MYSQL_USER || 'root',
  // Omit or set password to an empty string if there's no password
  password: mysqlConfig.password || process.env.MYSQL_PASSWORD || '',
  database: mysqlConfig.database || process.env.MYSQL_DATABASE || 'csci275-project-gopro',
  port: process.env.MYSQL_PORT || 3306,
  connectionLimit: 10,
};

// Create MySQL connection pool
const db = mysql.createPool(dbConfig);

// Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL Database:', err);
  } else {
    console.log('Connected to MySQL Database');
    connection.release();
  }
});

// Routes
app.get('/hello', (req, res) => {
  res.send('Hello from Express.js running on Firebase Cloud Functions!');
});

// Example route interacting with the database
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Export the Express app as a Cloud Function
exports.app = functions.https.onRequest(app);

// For local development
if (require.main === module) {
  const port = process.env.PORT || 5002;
  app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}/`);
  });
}