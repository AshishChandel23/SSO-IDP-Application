import { Strategy as BearerStrategy } from 'passport-http-bearer'; 
import User from '../../src/user/model';
import { TokenCode } from '../../src/auth/model';

const getBearerStrategy = (passport) => {
    
    passport.use(
        new BearerStrategy(async (token, done) => {
          const user = await TokenCode.findOne({accessToken:token});
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
    );
};

export default getBearerStrategy;


