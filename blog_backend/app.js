require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var http=require('http');

//set express
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); 
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb server
mongoose.connect(process.env.DB_URI);
var db=mongoose.connection;
db.on('error',console.error);
db.once('open',function(){
    console.log('connected to mongod server');
});

//import router
var router=require('./routes');
app.use('/',router);

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, '../blog_front/build/')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../blog_front/build/', 'index.html'));
});

var port = process.env.PORT || 4000;

var server= http.createServer(app).listen(port,function(){
    console.log("Express server has started on port " + port)
});
