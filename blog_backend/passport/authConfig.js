require('dotenv').config();
var Account = require('../model/account');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    Account.findOne({oauthID:profile.id},function(err,user){
        if(err){
        console.log(err);
        }
        if (!err && user !== null) {
            done(null, user);
        }else{
            var account=new Account({
                oauthID:profile.id,
                userName:profile.displayName,
                email: profile.emails[0].value,
            });
            account.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log('saving user');
                    done(null,user);
                }
            });
        }
    });  
  }));
