//-----------------------------
// Creating Express Application
//-----------------------------
const express = require('express');
const app = express();
const port = 3000;

//------------------
// Other Dependecies
//------------------
const path = require('path');
const { projects } = require('./data.json');

//-------------------------------
// Static Files & Pug View Engine
//-------------------------------
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set(`view engine`, `pug`);

//-------
// Routes
//-------
// Home Page
app.get('/', (req, res) => {
    res.render('index', { projects });
});

// About Page
app.get('/about', (req, res) => {
    res.render('about');
});

// Project Pages
app.get('/project/:id', (req, res, next) => {
    const projectId  = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    project ? res.render('project', { project }) : next();
});

//---------------
// Error Handling
//---------------
// 404 Error Handler
app.use((req, res, next) => {
  const err = new Error('The resource you are looking for does not exist.')
  err.status = 404;
  res.render('page-not-found', { err } );
  console.log(`Error Code ${err.status}: ${err.message}`);
});

// Globar Error Handler
// Note, part of this code snip is being referenced from https://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500);
    res.render('error', { err });
    console.log(`Error Code ${err.status}: ${err.message}`);
})

//--------------------------
// Listening For Connections
//--------------------------
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});