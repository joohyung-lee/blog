//load plugin
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport'),
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

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
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
  console.log(authConfig.google);
  res.render('index', {
    user: req.user
  });
});

app.get('/login', function(req, res) {
  res.render('login', {
    user: req.user
  });
});
app.get('/auth/google',
  passport.authenticate('google', { scope: ['openid email profile'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
app.get('/account', ensureAuthenticated, function(req, res) {
  res.render('account', {
    user: req.user
  });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
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
