/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Danish Khan Durrani Student ID: dkdurrani 128284221 Date: 18 june
********************************************************************************/
const path = require('path');
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var collegeData = require("./collegeData");

// Set up static file directory
app.use(express.static("public"));

// Set up views directory and template engine
app.set("views", "./views");
app.set("view engine", "ejs");

// Routes
app.get("/students", (req, res) => {
  let course = req.query.course;
  if (course) {
    collegeData.getStudentsByCourse(course)
      .then(students => {
        if (students.length > 0) {
          res.json(students);
        } else {
          res.json({ message: "no results" });
        }
      })
      .catch(err => {
        res.json({ message: err });
      });
  } else {
    collegeData.getAllStudents()
      .then(students => {
        if (students.length > 0) {
          res.json(students);
        } else {
          res.json({ message: "no results" });
        }
      })
      .catch(err => {
        res.json({ message: err });
      });
  }
});

app.get("/tas", (req, res) => {
  collegeData.getTAs()
    .then(tas => {
      if (tas.length > 0) {
        res.json(tas);
      } else {
        res.json({ message: "no results" });
      }
    })
    .catch(err => {
      res.json({ message: err });
    });
});

app.get("/courses", (req, res) => {
  collegeData.getCourses()
    .then(courses => {
      if (courses.length > 0) {
        res.json(courses);
      } else {
        res.json({ message: "no results" });
      }
    })
    .catch(err => {
      res.json({ message: err });
    });
});

app.get("/student/:num", (req, res) => {
  let num = req.params.num;
  collegeData.getStudentByNum(num)
    .then(student => {
      res.json(student);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

// Import the path module
const path = require('path');

// ...

// GET /
app.get('/', (req, res) => {
  // Return the home.html file
  res.sendFile(path.join(__dirname, 'WEB700-APP', 'views', 'home.html'));
});

// GET /about
app.get('/about', (req, res) => {
  // Return the about.html file
  res.sendFile(path.join(__dirname, 'WEB700-APP', 'views', 'about.html'));
});

// GET /htmlDemo
app.get('/htmlDemo', (req, res) => {
  // Return the htmlDemo.html file
  res.sendFile(path.join(__dirname, 'WEB700-APP', 'views', 'htmlDemo.html'));
});


// 404 route
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Initialize collegeData and start the server
collegeData.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("Server listening on port: " + HTTP_PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });