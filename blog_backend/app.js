//load plugin
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport'),
var GoogleStrategy = require('passport-google-oauth20').Strategy;

//passport session
passport.serializeUser(function(user, done) {
  // done(null, user.id);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  // Users.findById(obj, done);
  done(null, obj);
});
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

//set express
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); 

//connect to mongodb server
mongoose.connect(process.env.DB_URI);

var db=mongoose.connection;
db.on('error',console.error);
db.once('open',function(){
    console.log('connected to mongod server');
});

//define model
var motionLab=require('./routes');
app.use('/api/motionlab',motionLab);

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, '../blog_front/build/')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../blog_front/build/', 'index.html'));
});

var port = process.env.PORT || 4000;
var server=app.listen(port,function(){
    console.log("Express server has started on port " + port)
});
