const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = "166934473160-5f0smhuuc92272obrd2l985m0905f268.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser((user,done)=>{
  done(null,user);
})

passport.deserializeUser((user,done)=>{
  done(null,user);
})