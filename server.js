var express = require("express");
var login = require('./project/routes/loginroutes');
var chat = require('./project/routes/chat')
var check = require('./project/routes/check')
var sys = require('sys');
var exec = require('child_process').exec;
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'ejs');


path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/project'));
app.use('/', express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(session({
    secret: 'aaabbbcccdddeee',
    resave: false,
    saveUninitialized: true
}))
var router = express.Router();

var fs = require('fs');

// //route to handle user registration
router.post('/register', login.register);
 router.post('/login', login.login);
// router.post('/submit', login.submit);
// router.post('/enter', login.enter);
// router.post('/delete/:product_id', login.delete)

 app.use('/api', router);
// app.use('/check', check);

app.listen(8888, function() {
    console.log('Server is running. Point your browser to: http://localhost:8888');
});