const passport = require("passport");
const User = require("../models/User");
const FacebookStrategy = require("passport-facebook");
const crypto = require("crypto");

const serverUrl =
  process.env.NODE_ENV === "production"
    ? process.env.SERVER_URL_PROD
    : process.env.SERVER_URL_DEV;

// facebook strategy
const facebookLogin = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: `${serverUrl}${process.env.FACEBOOK_CALLBACK_URL}`,
    profileFields: [
      "id",
      "email",
      "gender",
      "profileUrl",
      "displayName",
      "locale",
      "name",
      "timezone",
      "updated_time",
      "verified",
      "picture.type(large)",
    ],
  },
  async (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    try {
      const oldUser = await User.findOne({ email: profile.emails[0].value });

      if (oldUser) {
        return done(null, oldUser);
      }
    } catch (err) {
      console.log(err);
    }

    // register user
    try {
      const newUser = await new User({
        provider: "facebook",
        facebookId: profile.id,
        username: `user${profile.id}`,
        email: profile.emails[0].value,
        name: profile.displayName,
        password: crypto.randomBytes(32).toString("hex"),
        image: profile.photos[0].value,
        isActive: true,
      }).save();

      done(null, newUser);
    } catch (err) {
      console.log(err);
    }
  }
);
passport.use(facebookLogin);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user._id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
