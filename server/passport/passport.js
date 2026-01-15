const google = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { userModel } = require('../mongoose/model/model')

passport.use(new google({
     clientID: process.env.CLIENT_ID,
     clientSecret: process.env.CLIENT_SECRET,
     callbackURL: '/google'
},
     async (accessToken, refreshToken, profile, done) => {
          try {
               let user = await userModel.findOne({ googleId: profile.id });
               if (!user) {
                    user = await userModel.create({
                         googleId: profile.id,
                         username: profile.displayName,
                         email: profile.emails[0].value,
                         isGoogle: true
                    });
               }
               return done(null, user);
          } catch (e) {
               return done(err, null);
          }
     }));