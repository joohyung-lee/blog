require('dotenv').config();
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../model/account');
var urlConfig = require('../../config/urlConfig');
var proxied_url = urlConfig[process.env.NODE_ENV].proxied_url;

router.get('/', function(req, res) {
  res.json({
      user:req.user
  });
});
router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  function(req,res){
   res.redirect(proxied_url);
  });


router.get('/account', ensureAuthenticated, function(req, res){
  Account.findById(req.session.passport.user, function(err, user) {
    if(err) {
      console.log(err);  // handle errors
    } else {
      res.json({
          user:req.user
      });
    }
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect(proxied_url);
});

// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
module.exports = router;