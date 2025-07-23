const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app =express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'chr789789',
  database: 'myapp'
});
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database');
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

app.post('/users', (req, res) => {
    const{name} = req.body;
    if (!name) {
      return res.status(400).send('Name is required');
    }
    db.query('INSERT INTO users (name) VALUES (?)', [name], (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(201).json({ id: results.insertId, name });
    });
    });
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Name is required');
  }
  db.query('UPDATE users SET name = ? WHERE id = ?', [name, id], (err, results) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    res.json({ id, name });
  });
});

app.delete('/users/:id', (req, res) => {        
  const id = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('User not found');
    }
    res.status(204).json({message: 'User deleted successfully'});
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



