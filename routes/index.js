var express = require('express');
var router = express.Router();
const mysql = require('mysql2'); // ←ここをmysql2に変更
const app = require('../app');

const connection = mysql.createConnection({
  host :  'localhost',
  user:  'root',
  password:  'root',
  database:  'memoapp'
});
/* GET home page. */
app.get('/', function(req, res) {
  connection.query(
    'SELECT * FROM memo',
    (error,results) => {
      console.log(results);
      res.render('index', { items: results, title: 'Memo App' });
    }
  );
  
});



module.exports = router;
