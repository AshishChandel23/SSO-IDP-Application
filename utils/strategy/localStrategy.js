import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../src/user/model';

const getLocalStrategy = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
            try {
                const user = await User.findOne({email});
                if (!user) {
                    return done(null, false, { message: 'Incorrect credentials.' });
                }
                // const isMatch = await user.comparePassword(password);
                // if (!isMatch) {
                //     return done(null, false, { message: 'Incorrect credentials.' });
                // }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};

export default getLocalStrategy;


