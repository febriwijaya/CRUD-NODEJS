const express = require('express');
const mysql = require('mysql');
const app = express();

// tempelkan code untuk menspesifikasikan foto dan css
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: false
}));
// tambahkan rute untuk halaman beranda

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pnodejs'
});


app.get('/', (req, res) => {
  res.render('top.ejs');
})

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

// tambahkan rute untuk index
app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      res.render('index.ejs', {
        items: results
      });
    }
  );
});

app.post('/create', (req, res) => {
  // Ketik kueri untuk menambahkan data ke database            
  connection.query(
    'INSERT INTO items (name) VALUES (?)',
    [req.body.itemName],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM items WHERE id=?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );

});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM items WHERE id=?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {
        item: results[0]
      });
    }
  );
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE items SET name=? WHERE id=?',
    [req.body.itemName, req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.listen(3000);