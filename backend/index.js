// index.js
const express = require('express');
const bodyParser = require('body-parser');
const { insertUser } = require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// API endpoint to accept user data
app.post('/api/user', (req, res) => {
  const { name } = req.body;
  const ip_address = req.ip;

  if (!name) {
    return res.status(400).send({ message: 'Name is required' });
  }

  // Insert user data into the database
  insertUser(name, ip_address);

  res.status(200).send({ message: 'User data received', name, ip_address });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
