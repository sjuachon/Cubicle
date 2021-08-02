const express = require('express');
const bodyParser = require('body-parser');
const route = express.Router();
// const cubeCtrl = require('../controllers/cubeCtrl')

module.exports = (app) => {
    app.get('/', function (req, res) {
        res.render('index')

    });

    app.get('/about', function (req, res) {
        res.render('about');
    });

    app.get('/create', function (req, res) {
        res.render('create')
    })

    app.get('/details/:id', function (req, res) {
        res.send('<h1>Details with ID go here.</h1>')
    })


};

// route.get('/', cubeCtrl.getHome)
// route.get('/about', cubeCtrl.getAbout)
// route.get('/create', cubeCtrl.getCreate)


// module.exports = route