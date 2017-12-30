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
import fs from 'fs';

//set express
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); 
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
  key:'user',
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  
}));
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb server
//mongoose.connect(process.env.DB_URI);
var db=mongoose.connection;
db.on('connecting', function() {
  console.log('connecting to MongoDB...');
});

db.on('error', function(error) {
  console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});
db.on('connected', function() {
  console.log('MongoDB connected!');
});
db.once('open', function() {
  console.log('MongoDB connection opened!');
});
mongoose.connect(process.env.DB_URI);

//import router
var router=require('../routes');
app.use('/',router);

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, '../../../blog_front/build/')));
app.get('*', function (req, res) { 
  res.sendFile(path.join(__dirname, '../../../blog_front/build/', 'index.html'));
});
var port = process.env.PORT || 4000;
var server= http.createServer(app).listen(port,function(){
    console.log("Express server has started on port " + port)
});
