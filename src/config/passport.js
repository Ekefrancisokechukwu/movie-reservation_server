const passport = require("passport");
const {
  Profile,
  Strategy,
  StrategyOptions,
  VerifyCallback,
} = require("passport-google-oauth20");
const { findUserByEmail, createUser } = require("../model/UserModal");

const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
};

const AUTH_OPTIONS = {
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: config.CALLBACK_URL,
};

async function verifyCallback(accessToken, refreshToken, profile, done) {
  const { id: googleId, displayName: fullname } = profile;
  const profileImg = profile.photos[0].value;
  const email = profile.emails[0].value;

  const user = findUserByEmail(email);

  if (!user) {
    createUser(googleId, fullname, email, (role = "customer"), profileImg);
  }

  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
