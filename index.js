const env = process.env.NODE_ENV || 'development';
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const config = require('./config/config')[env];
const cubeRoutes = require('./config/routes');
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);
app.set("view engine", "hbs");
app.engine(
	"hbs",
	exphbs({
		extname: "hbs",
		defaultLayout: "index",
		layoutsDir: __dirname + "/views",
	})
);

// middlewares
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cubeRoutes);
app.use((req, res)=>{
  res.render('../views/404.hbs')
})

app.listen(
    config.port, 
    console.log(`Listening on port ${config.port}! Now its up to you...`)
);