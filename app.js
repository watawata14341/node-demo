const express = require('express');
const app = express();

const mysql = require('mysql');

app.use(express.static('public'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'progate',
    password: 'password',
    database: 'list_app'
});

app.get('/', (req, res) => {
    res.render('top.ejs');
});

app.get('/index', (req, res) => {
    // データベースからデータを取得する処理を書いてください
    connection.query(
      'SELECT * FROM items',
      (error, results) =>{
        console.log(results)
        res.render('index.ejs');
      }
    );
});

app.listen(3000);