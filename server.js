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





app.get('/', function(req, res) { //view and edit scores
  // let rawinfo = fs.readFileSync(__dirname + "/userinfo.json")
  // let feed = JSON.parse(rawinfo)
  // let text = feed.text
  res.render('index.ejs');
});


app.post('/login', function(req, res) {
  let login = {
    name: req.body.uname,
    password: req.body.pass
  }
  console.log(login)

  if (login.name && login.password) {
      let rawinfo = fs.readFileSync(__dirname + '/userinfo.json')
      let feed = JSON.parse(rawinfo)
      feed.comments.push(login);
      console.log(feed);
      fs.writeFile(__dirname + '/userinfo.json', JSON.stringify(feed), 'utf8', function() {
        console.log('wrote to file')
        res.render('index.ejs');

      })
  }
})

//
//
//
//
//
//
//
// app.get('/access', function(req, res) {
//   res.render('access.ejs', {//list of users and their scores, also used for adding and removing students
//   });
// });
//
 app.get("/teacher", function(req, res) {
   res.render("teacher.ejs", {
     // addamt: {},
     // subamt: {},
     // starteramt: 100
   })
 })


 app.post('/access', function(req, res) {
   res.render('access.ejs', {
   });
 });

 app.get('/addStudent?', function (req, res){
   res.render('addStudent', {
   })
 })

 app.post('/addStudent', function (req, res) {
     var studentInfo = {
       studentID: req.body.studentID,
       points: req.body.points
     }
     console.log(studentInfo)

     if (studentInfo.studentID) {
         let rawdata = fs.readFileSync(__dirname + '/studentInfo.json')
         let parse = JSON.parse(rawdata)
         parse.students.push(studentInfo);
         console.log(parse);
         fs.writeFile(__dirname + '/studentInfo.json', JSON.stringify(parse), 'utf8', function() {
           console.log('student ID written with points')
           res.render('addStudent.ejs');

         })

     }
   })




app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
