const express = require('express');
const readline = require('readline');
app = express()
const hostname = '127.0.0.1'
const port = 1337;


app.set('view engine', 'ejs');


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

app.get('/student', function(req, res) { //this is completly worthless and will be killed as soon as the database is created
  res.render('student.ejs', {//you will need to be reidrected here if you are a student from /
    Name: 'Trey2023008',
    Professionalism: "lmao gay",
    Empathy: 'deez nuts',
    Innovation: 'hah gotem',
    Optimism: 'why you always lyin',
    Integrity: 'ohhhhh my god',
    Perseverance: 'what the dog doin'
  });
});

app.post('/access', function(req, res) {
  res.render('access.ejs', {
  });
});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
