require('dotenv').config();
const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const StrategyJwt = require('passport-jwt').Strategy;
const dbpool = require('../config/database')

passport.use(
    new StrategyJwt(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        function(jwtPayload, done){        
            return dbpool.execute(`SELECT * FROM users where id = ${jwtPayload.id}`)
                .then((user) => {
                    return done(null, user);
                })
                .catch((error) => {
                    return done(error)
                })
        }
    )
    
)