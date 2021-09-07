//     //TODO: Setup the view engine

//     //TODO: Setup the body parser

//     //TODO: Setup the static files

// };

const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const path = require('path');
const url = require('url');

module.exports = (app) => {
    
    // app.set('views', path.join(__dirname, 'views'));
    // app.set('views engine', 'hbs');

    //TODO: Setup the body parser
    app.use(bodyParser.urlencoded({extended: true}))
    //TODO: Setup the static files

    app.use(express.static('static'));
};