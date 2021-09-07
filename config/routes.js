// TODO: Require Controllers...

const express = require('express');
const route = express.Router();
const exphbs = require('express-handlebars');
const Cube = require("../models/cube")
const Accessory = require("../models/accessory")
const bcrypt = require('bcrypt');
const User = require('../models/user');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// cubeCtrl = require('../controllers/cubeCtrl')
// root folder

/// SET Global Variables
var myToken = "";
var loggedInUser = "";

module.exports = (app) => {

// app.get("/", cubeCtrl.homePage)



    // get login folder
    app.get("/login", function (req, res) {
        console.log("This is the login page!");
        res.render('login')
        // res.send("Form Submitted")
    })

    // post login folder
    app.post("/login", async function (req, res) {

        // To sign a token, you will need to have 3 pieces of information:

        // The token secret
        // The piece of data to hash in the token
        // The token expire time
        // The token secret is a long random string used to encrypt and decrypt the data.

        // To generate this secret, one option is to use Node.js’s built-in crypto library, like so:
    
    console.log("This is the login page post route!");
    // res.render('login')
    // res.send(req.body);
    console.log("This is data entered from the form:  ", req.body);

    

       
    // get the user and hashed-password from the database
    let usernameInForm = req.body.username;
    // Load hash from your password DB.
    const myUser = await User.findOne({username: usernameInForm})
    console.log("This is myUser username (from MongoDB): ", myUser) // sidney
    console.log("This is myUser password  (from MongoDB): ", myUser.password) // some hashed password other than cat that's in the database
    
          
    
    // compare the hashed-password entered in the form with the hashed-password in User database
    let areYouAUser = bcrypt.compare(req.body.password, myUser.password, function(err, isMatch) {
        if(isMatch){
            // console.log("The entered user is the same as the database: ", isMatch) // res === true
            // loggedInUser = myUser.username
            // console.log(loggedInUser + " is the logged in user");
            var payload = {_id: myUser._id , username: myUser.username};
            var options = {expiresIn: '1d'};
            const secret = "SuperSecret";

            var token = jwt.sign(payload, secret, options);
            myToken = res.cookie('jwtCookie', token) // jwtCookie = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTI0YjMyOGY0NTgzZTE5ZGNlMjBmZWQiLCJ1c2VybmFtZSI6ImthdGhlcmluZSIsImlhdCI6MTYyOTk0ODQwNSwiZXhwIjoxNjMwMDM0ODA1fQ.TXJE_QWvjYmSHb-Fgrd_LT4mucoPAE4X1ErRnA1bB94
             // set global variable loggedUser = myUser.username that was acquired.
            loggedInUser = myUser.username;        
            console.log("Logged in user is : ", loggedInUser);
            res.redirect('/');
        } else {
            console.log("The credentials are not in the database, thus not an authorized user: ", isMatch) // res === true
            res.redirect('/login')
        }
        
    });
})


    app.get('/', async (req, res, next) => {
        // console.log(req.cookies.token);
        console.log('loggedInUser is :', loggedInUser);
        const myUser = await User.findOne({username: loggedInUser})
            await Cube.find(function (err, cubesFound) {
            // if (err) return console.error(err);
                // console.log(cubesFound);

                console.log(req.cookies)
                
                res.render('index', { cubes: cubesFound, jwtCookie: req.cookies.jwtCookie }); // cubes - from mongoDb
            }).lean().exec(function(err, body) {            // cubesFound - parameter used in find
                console.log(err)
                console.log(body)
            });
    });

    //  get about folder
    app.get('/about', function (req, res) {
        res.render('about');
    });

    // get create folder
    app.get('/create', function (req, res) {
        if(loggedInUser){
            res.render('create')
        } else {
             console.log("Permission denied!")
             res.render('login')
        }
    })
    // post create folder
    app.post("/create", function(req, res){
        // console.log(req.body);

       if(loggedInUser !== ''){
            const newCube = new Cube({
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                difficultyLevel: req.body.difficultyLevel
            });
            newCube.save(function (err, newCube) {
                if (err) return console.error(err);
                "Cube is entered"
              });
              res.render('index');
    
        } else {
            console.log("Permission denied!")
            res.render('login')
        }

        
    });

    
    // get createAccessory

    app.get('/createAccessory', function (req, res) {
        if(loggedInUser !== ""){
            res.render('createAccessory')
        } else {
            console.log("Permission denied!")
            res.render('login')
        }
    })

    // post createAccessory
    app.post("/createAccessory", function(req, res){
        // console.log(req.body);
        if(loggedInUser !== ''){
            const newAccessory = new Accessory({
                name: req.body.name,
                description: req.body.description,
                imageURL: req.body.imageUrl            
            });
            newAccessory.save(function (err, newCube) {
                if (err) return console.error(err);
                "Accessory is entered"
              });
              res.render('index');
        
        } else {
            console.log("Permission denied!")
            res.render('login')
            
        }
    })

    // get attachAccessory

    app.get('/attachAccessory/:cubeId', async function (req, res) {
        console.log(req.params.id);  
        if(loggedInUser !== ""){
            // await Cube.find(function (err, cubesFound) 
            const oneCube = await Cube.findById(req.params.cubeId).lean(); //.populate('accessories');
            console.log("oneCube is:  ", oneCube);
            const accessories = await Accessory.find({}).lean()
            res.render('attachAccessory', {oneCube, accessories})
        } else {
            console.log("Permission denied!")
            res.render('login')
        }
    })

    // post attachAccessory
    let oneCube = new Cube;
    app.post("/attachAccessory/:id", function(req, res){
        // console.log(req.body);
        if(loggedInUser !== ''){
            console.log("The accessory id associated to the accessory to attach: " + req.body.accessory); // accessory id associated to the accessory to attach
            console.log("The cube id to which cube the accessory goes to: " + req.params.id) // The cube id to which cube the accessory goes to
        let oneCube = Cube.findById(req.params.id).lean();
        console.log("oneCube._id is: ", oneCube._id);
        var accessoryToAdd = oneCube.findOneAndUpdate({_id: req.params.id}, {$push: {accessories: req.body.accessory}} );
        // console.log(oneCube.accessories, typeof(oneCube.accessories));
            // res.render('details:req.body.cubeId');

        
        } else {
            console.log("Permission denied!")
            res.render('login')
        }
    })
    
    // get details folder
    app.get('/details/:id', async function (req, res) {
        if(loggedInUser !== ""){
            
        console.log(req.params.id)
        await Cube.findById(req.params.id,function (err, id) {
            // if (err) return console.error(err);
                console.log(id);
                res.render('details', { oneCube: id });
        }).lean().exec(function(err, body) {
            console.log(err)
            console.log(body)
        });
            await Accessory.find({}, function (err, id) {
                // if (err) return console.error(err);
                    console.log(Accessory);
                    // res.render('details', { oneCube: id });
            }).lean().exec(function(err, body) {
                console.log(err)
                console.log(body)
            });
        } else {
            console.log("Permission denied!")
            res.render('login')
        }
    })

    app.get('/updateCube/:id', async function(req, res) {
        if(loggedInUser !== ""){
            console.log(req.params.id)
        await Cube.findById(req.params.id,function (err, id) {
            // if (err) return console.error(err);
                console.log(id);
                res.render('details', { oneCube: id });
        }).lean().exec(function(err, body) {
            console.log(err)
            console.log(body)
        });
        } else {
            console.log("Permission denied!")
            res.render('login')
        }
    })
    // need global variable to bring over req.params.id from /updateCube/:id to /updateNotLoggedIn
   
    app.post('/updateCube/:id', async function(req, res){
        if(loggedInUser !== ""){
            const oneCube = await Cube.findById(req.params.id, function(err, id){
                console.log(oneCube);
                res.render('details', {oneCube: id})

                 // need global variable to bring over req.params.id from /updateCube/:id to /updateNotLoggedIn
                var updateCubeId = req.params.id; 
            })

        } else {
            console.log("Permission denied!")
            res.render('updateNotLoggedIn') // to render updateNotLoggedIn.hbs similar to the login form.
        }
    })

    app.get ('/updateNotLoggedIn', async function(req, res){
        res.render('updateNotLoggedIn');
    })
 
    // get register folder
    app.get("/register", function (req, res) {
        console.log("This is the register page!");
        res.render('register')
        // res.send("Form Submitted")
    })
    // post /register folder
    app.post("/register", function(req, res) {
        console.log(req.body)
        const salt = 9;
        if(req.body.password === req.body.repeatPassword){
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                // store has stuff in your password in Users collection
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                });

                newUser.save(function (err, newUser) {
                    if (err) return console.error(err);
                    "New user is entered"
                });
                res.render('login');
            })
        }     
    });

    
    app.get("/logout", function (req, res) {
        console.log("This is the logout page!");
        console.log(loggedInUser + " is logged out!")
        
        res.render('logout')
        // res.send("Form Submitted")
    })
    app.post("/logout", function (req, res) {
        console.log(loggedInUser + " is logged out!")
        let h1UsernameLoggedOut = document.getElementsByTagName('h1');
        h1UsernameLoggedOut.innnerHTML = "<h1>" + loggedInUser + " is logged out.";
        loggedInUser = "";
        res.render('logout')
        // res.send("Form Submitted")
    })

    app.get('/invalidCredentials', function(req, res){
        console.log(`Credentials for ${req.body.username} is invalid`);
    });
























    app.get('/*', function (req, res) {
            res.render('404');
        }) //////////

}


// // 
            //      Cube.findById(req.params.id, function(req, res) {
            //         if(err) return console.error(arr);
            //         Accessory.find(function(err, accessories) {
            //             if(err) return console.error(err);
            //         }).then((response) => {
            //             let attachedArray = [];
            //             response.forEach(item => {
            //                 if(cube.addedAccessories.includes(item._id)) {
            //                     attachedArray.push(item);
            //                 }
            //             });
            //             res.render('details', {cube, attachedArray})
            //         });
            //     });
            // });