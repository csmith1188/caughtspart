const express = require('express');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
app = express()
const hostname = '127.0.0.1'
const ejs = require('ejs');
app.use(express.urlencoded({ extended: true}));
const port = 1337;


app.set('view engine', 'ejs');
app.static('/static', 'style.css')

app.get('/', function(req, res) { //view and edit scores
  res.render('index.ejs', { //depending on perms ^
  });
});

app.get('/access', function(req, res) {
  res.render('access.ejs', {//list of users and their scores, also used for adding and removing students
  });
});

app.get("/teacher", function(req, res) {
  res.render("teacher.ejs", {

  })
})

app.get("/student", function(req, res) {
  res.render("student.ejs", {

  })
})


app.get('/finished', function(req,res){
  res.render('thx.ejs', )
})
app.post('/access', function(req, res) {
  res.render('access.ejs', {
  });
});


app.listen(port, hostname, () => {
  console.log(`Server running at port: ${port}`);
});
