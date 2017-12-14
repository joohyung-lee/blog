require('dotenv').config();
let express = require('express');
let router = express.Router();
let passport = require('passport');
let Account = require('../model/account');
let urlConfig = require('../../config/urlConfig');
let proxied_url = urlConfig.proxied_url;
let passportGoogle = require('../passport/google');
let passportFacebook = require('../passport/facebook');
let passportGithub=require('../passport/github');

router.get('/google',
  passportGoogle.authenticate('google', { scope:
  	[ 'https://www.googleapis.com/auth/plus.login',
  	  'https://www.googleapis.com/auth/plus.profile.emails.read' ] }

));
router.get('/google/callback',
  passportGoogle.authenticate('google', {
    failureRedirect: `${proxied_url}auth/loginPopup/fail`,
    successRedirect:`${proxied_url}auth/loginPopup/success`
  }));
router.get('/facebook',
  passportGoogle.authenticate('facebook', { scope: 'email'}));

router.get('/facebook/callback',
passportGoogle.authenticate('facebook', {
  failureRedirect: `${proxied_url}auth/loginPopup/fail`,
  successRedirect:`${proxied_url}auth/loginPopup/success`
}));

router.get('/github',
passportGithub.authenticate('github', { scope: 'email'}));

router.get('/github/callback',
passportGithub.authenticate('github', {
failureRedirect: `${proxied_url}auth/loginPopup/fail`,
successRedirect:`${proxied_url}auth/loginPopup/success`
}));

//admin user
router.get('/admin/account', adminAuthenticated, function(req, res){
  Account.findById(req.session.passport.user, function(err, user) {
    if(err) {
      console.log(err);  // handle errors
    } else {
      res.json({
          user:req.user,
      });
    }
  });
});  
router.get('/account', ensureAuthenticated, function(req, res){ 
  Account.findById(req.session.passport.user, function(err, user) {
    if(err) {
      console.log(err);  // handle errors
    } else {
      res.json({
          user:req.user,
      });
    }
  });
});

router.get('/logout', function(req, res) {
  req.logout();
    res.json({
      user:{}
  });
});

// Simple route middleware to ensure user is authenticated.
function adminAuthenticated(req, res, next) {
  if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined'
  || req.session.passport.user.email!=="joomation@gmail.com") {   
      return res.status(403).json({
          error: "NOT LOGGED IN",
          code: 403
      });
  }
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(`${proxied_url}`);
}
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(`${proxied_url}`);
}
module.exports = router;