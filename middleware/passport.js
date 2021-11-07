const bcrypt = require("bcrypt")
const JWTStrategy = require("passport-jwt").Strategy
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt
const LocalStrategy = require("passport-local").Strategy
const User = require("../db/models/User")

const {JWT_SECRET} = require("../config/keys")

exports.localStrategy = new LocalStrategy(
    async (username, password, done) => {
        console.log(username),
        console.log(password)
        try {
            const user = await User.findOne({ username: username });
            const passwordMath = user ? await bcrypt.compare(password, user.password) : false;

            if (passwordMath) return done(null, user)
            
            return done(null, false)
        } catch (error) {
            done(error)
        }
    }
)

exports.JWTStrategy = new JWTStrategy({
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
    },
    async (payload, done) => {
        if (Date.now() > payload.exp) {
            return done(null, false)
        }
        try {
            const user = await User.findById(payload._id);
            return done(null, user);
        } catch {
            done(error)
        }
    }
)