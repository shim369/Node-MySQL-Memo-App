const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
// const app = require('../app');

const connection = mysql.createConnection({
  host :  'localhost',
  user:  'root',
  password:  'root',
  database:  'memoapp'
});
/* GET home page. */
router.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM memo ORDER BY id ASC',
    (error,results) => {
      res.render('index', { items: results, title: 'Memo App' });
    }
  );
  
});

router.get('/new', (req, res) => {
  res.render('new.ejs', {title: 'Memo App' });
});

router.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO memo (title) VALUES (?)',
    [req.body.itemName],
    (error, results) => {
      res.redirect('/');
    }
  );
});

module.exports = router;
