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
router.get('/', function(req, res) {
  connection.query(
    'SELECT * FROM memo',
    (error,results) => {
      console.log(results);
      res.render('index', { items: results, title: 'Memo App' });
    }
  );
  
});



module.exports = router;
