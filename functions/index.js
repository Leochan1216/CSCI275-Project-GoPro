// Import dependencies
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
const mysqlConfig = {
  host: functions.config().mysql?.host || process.env.MYSQL_HOST || 'localhost',
  user: functions.config().mysql?.user || process.env.MYSQL_USER || 'root',
  password: functions.config().mysql?.password || process.env.MYSQL_PASSWORD || '',
  database: functions.config().mysql?.database || process.env.MYSQL_DATABASE || 'csci275-project-gopro',
  port: functions.config().mysql?.port || process.env.MYSQL_PORT || 3306,
  connectionLimit: 10,
};

// Create MySQL connection pool
const db = mysql.createPool(mysqlConfig);

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

// Root route for health check
app.get('/', (req, res) => {
  res.send('Welcome to the Firebase Cloud Function with Express.js!');
});

// Example route: Test database connection and fetch data
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(results);
    }
  });
});

// Example route for greeting
app.get('/hello', (req, res) => {
  res.send('Hello from Express.js running on Firebase Cloud Functions!');
});

// Export the Express app as a Cloud Function
exports.app = functions.https.onRequest(app);

// Local development
if (require.main === module) {
  const port = process.env.PORT || 5002;
  app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}/`);
  });
}
