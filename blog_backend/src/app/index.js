require('dotenv').config();
import express from 'express';

import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import http from 'http';
import authCofig from '../passport/authConfig';
import Account from '../model/account';

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
var router=require('../routes');
app.use('/',router);
//passport session
passport.serializeUser(function(user, done) {
  // done(null, user.id);
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  Account.findById(id, function(err, user){
      if(!err) done(null, user);
      else done(err, null);
    });
});
// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, '../../blog_front/build/')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../blog_front/build/', 'index.html'));
});


var port = process.env.PORT || 4000;
var server= http.createServer(app).listen(port,function(){
    console.log("Express server has started on port " + port)
});
