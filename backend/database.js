// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db'); // Single database file for both tables

// Create tables if they don't exist
db.serialize(() => {
  // Create 'users' table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    ip_address TEXT
  )`);

  // Create 'courses' table
  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_name TEXT NOT NULL,
    professor TEXT,
    type TEXT
  )`);
});

// Function to insert user data
function insertUser(name, ip_address) {
  db.run('INSERT INTO users (name, ip_address) VALUES (?, ?)', [name, ip_address], function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`A user with id ${this.lastID} has been inserted`);
  });
}

// Function to insert course data
function insertCourse(course_name, professor, type) {
  db.run('INSERT INTO courses (course_name, professor, type) VALUES (?, ?, ?)', [course_name, professor, type], function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`The course with id ${this.lastID} has been inserted`);
  });
}

// Function to get all course names
function getCourses(callback) {
  db.all('SELECT course_name FROM courses', [], (err, rows) => {
    if (err) {
      return callback(err);
    }
    callback(null, rows);
  });
}

// Export the functions
module.exports = { insertUser, insertCourse, getCourses };

