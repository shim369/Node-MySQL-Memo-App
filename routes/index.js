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

router.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM memo WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

router.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM memo WHERE id = ?',
    [req.params.id],
    (error,results) => {
      res.render('edit.ejs',{item: results[0],title: 'Memo App' });
    }
  );
});

router.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE memo SET title = ? WHERE id = ?',
    [req.body.itemName,req.params.id],
    (error,results) => {
      res.redirect('/');
    }
  );
});

module.exports = router;
