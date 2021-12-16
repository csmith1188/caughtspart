
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const http = require('http');
var fs = require('fs')
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('login.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

  console.log('connection successful!');
});
//
// db.run(
//   `CREATE TABLE users(username, password, email, id)`
// );
//
// const sql = `INSERT INTO users(username, password, email, id)
//                 VALUES(?,?,?,?)`;


// db.run(
//   sql,
//   ['test','test','test@gmail.com', 1],
//   (err) => {
//   if (err) return console.error(err.message);
//   console.log('new row created');
// });
//
// db.close((err) => {
//   if (err) return console.error(err.message);
// });


const hostname = '127.0.0.1'
const port = 1337;


var app = express();
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')))
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + 'index.html'));
});



app.post('/auth', function(request, response) {
  var username = request.body.uname;
  var password = request.body.pass;
  if (username && password) {
    db.get(`SELECT * FROM users WHERE users = '${username}' AND password = '${password}';`, function(error, results) {
      if (results) {
        request.session.username = username;
        request.session.loggedin = true;
        console.log('Logged in');
        response.redirect('/home');
      } else {
        response.send('Incorrect Username and/or Password!');
      }
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});


app.get('/home', function(request, response) {
  if (request.session.loggedin) {
    response.sendFile('index.html')
  } else {
    response.send('Please login to view this page!');
  }
});

app.listen(port, hostname, () => {
  console.log('lol')

});
