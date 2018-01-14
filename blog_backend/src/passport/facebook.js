require('dotenv').config();
import Account from '../model/account';
import passport from 'passport';
import authInit from './authInit';
var FacebookStrategy = require('passport-facebook').Strategy;

//facebook login
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'emails','displayName', 'photos','gender' ]
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile._json.picture.data)
    var updates = {
        oauthID:profile.id,
        userName: profile.displayName,
        email: profile.emails[0].value,
        profileImg:{
          url:profile._json.picture.data.url,
          isDefault:profile._json.picture.data.is_silhouette
        },
        type:'facebook'
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