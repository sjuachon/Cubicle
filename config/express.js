const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const path = require('path');
const url = require('url');

module.exports = (app) => {
    
    // app.set('views', path.join(__dirname, 'views'));
    // app.set('views engine', 'hbs');

    //TODO: Setup the body parser

    //TODO: Setup the static files
    function getContentType(url){
        if(url.endsWith('css')){
          return 'text/css';
        }else if(url.endsWith('html')){
          return 'text/html';
        }else if(url.endsWith('png')){
          return 'image/png';
        }else if(url.endsWith('js')){
          return 'text/javascript';
        }else if(url.endsWith('ico')){
          return 'image/vnd.microsoft.icon';
        }else if(url.endsWith('jpg')){
          return 'image/jpeg';
        }else if(url.endsWith('jpeg')){
          return 'image/jpeg';
        }
      }

};