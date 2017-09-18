require('dotenv').config();
let express = require('express');
let router = express.Router();
let passport = require('passport');
let Account = require('../model/account');
let urlConfig = require('../../config/urlConfig');
let proxied_url = urlConfig[process.env.NODE_ENV].proxied_url;

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
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(`${proxied_url}`);
}
module.exports = router;