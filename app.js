const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'W2qbxt4i',
    database: 'list_app'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
    res.render('top.ejs');
});

app.get('/index', (req, res) => {
    connection.query(
      'SELECT * FROM items',
      (error, results) =>{
        console.log(results)
        res.render('index.ejs',{items: results});
      }
    );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  console.log(req.body.itemName);
  connection.query(
    'INSERT INTO items (name) VALUES (?)',
    [req.body.itemName],
    (error, results) =>{
      res.redirect('/index');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  console.log(req.params.id);
  connection.query(
    'DELETE FROM items WHERE id = ?',
    [req.params.id],
    (error, results) =>{
      res.redirect('/index');
    }
  );
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM items WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs',{item: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE items SET name = ? WHERE id = ?',
    [req.body.itemName, req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/list', (req, res) => {
  connection.query(
    'SELECT * FROM articles',
    (error, results) => {
      // EJSファイルに渡すデータとプロパティ名を確認してください
      res.render('list.ejs', { articles: results });
    }
  );
});

app.get('/article/:id', (req, res) => {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM articles WHERE id = ?',
    [id],
    (error, results) => {
      // EJSファイルに渡すデータとプロパティ名を確認してください
      res.render('article.ejs', { article: results[0] });
    }
  );
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.listen(3000);