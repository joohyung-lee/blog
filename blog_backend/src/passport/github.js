 require('dotenv').config();
import Account from '../model/account';
import passport from 'passport';
import authInit from './authInit';
var GithubStrategy = require('passport-github').Strategy;

//github login
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    var updates = {
        oauthID:profile.id,
        userName: profile.displayName,
        email: profile.emails[0].value,
        profileImg:{
          url:profile.photos[0].value,
          isDefault:false
        },
        type:'github'
      };
      var options = {
        upsert: true
      };
    Account.findOrCreate({ oauthID: profile.id },updates,options,function (err, user) {
        if(err) {
            return done(err);
          } else {
            return done(null, user);
          }
    });
  }));
  authInit();  
  module.exports = passport;