require('dotenv').config();
import Account from '../model/account';
import passport from 'passport';
import authInit from './authInit';
var GoogleStrategy=require('passport-google-oauth20').Strategy;
//google login
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, done) {
    var updates = {
        userName: profile.displayName,
        email: profile.emails[0].value,
        profileImg:profile._json.image,
        type:'google'
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
