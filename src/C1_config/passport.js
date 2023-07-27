import { Strategy, ExtractJwt } from "passport-jwt";
import user_model from "../B1_models/user_model.js";
import { jwt_secret_key } from "../C2_utils/constants.js";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwt_secret_key,
    algorithms: ['RS256']
};

const strategy = new Strategy(options, async (payload, done) => {
    try {
        const user = await user_model.findById(payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
})

export default function passport_config(passport) {
    passport.use(strategy);
}