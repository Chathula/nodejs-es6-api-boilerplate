import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import constants from '../config/contanats';
import User from '../modules/users/user.model';

// Local Strategy
const localOpts = {
  usernameField: 'email'
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
  try {
    const user =  await User.findOne({ email });

    if (!user) {
      return done(null, false);
    } else if (await user._comparePassword(password) === false) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

// JWT Strategy
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: constants.JWT_SECRET
};

const jwtStrategy = new JwtStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }

});

passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
