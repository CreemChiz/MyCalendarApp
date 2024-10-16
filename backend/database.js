// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

// Create table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    ip_address TEXT
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

module.exports = { insertUser };
