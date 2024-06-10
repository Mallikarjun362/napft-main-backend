import jwt from "jsonwebtoken";
import { jwt_secret_key } from "../utils/constants.js";
// MIDDLEWARE TO AUTHORIZE USER IN PROTECTED ROUTE
// PURPOSE? => REQUESTS WHICH REQUIRE A USER TO BE THE RIGHT SOURCE FOR THIS ACTION.
// HOW? => VERIFY JWT IN THE REQUEST BODY
// IF FAIL? => RETURN RESPONSE OF 
//      1. INVALID CREDENTIALS
//      2. TOKEN EXPIRATION
// IF SUCCESS? => PASS THROUGH
// LEVELS OF VERIFICATION
//      1. VALID JWT
//      2. PAYLOAD.METAMASK_ID == CLAIMED_USER_METAMASK_ID
// TASKS? => VERIFY JWT AND FORWARD REQUEST.
export function authorize_user(req, res, next) {
    // console.log("AUTHORIZE USER");
    // console.log(req.body);
    const token = req.body.JWT;
    // console.log(token);
    jwt.verify(token, jwt_secret_key, (err, decodedToken) => {
        if (err) {
            // Token verification failed 
            console.error('Token verification failed:', err.message);
            return res.status(400).send({ msg: "Invalid JWT Token" });
        } else {
            // Token verification successful
            // console.log('Decoded token:', decodedToken);
            const [t_now, t_exp] = [Number.parseInt(Date.now() / 1000), decodedToken.exp]
            const t_diff = t_exp - t_now;
            if (t_diff <= 0) {
                return res.status(400).send({ msg: "JWT TOKEN EXPIRED" });
            }
            if (req.body.user_metamask_ID !== decodedToken.id) {
                return res.status(400).send({ msg: "INVALID JWT WITH CORRESPONDING USER" });
            }
            req.body.user_metamask_ID = decodedToken.id;
            next()
            // You can now access the payload data using decodedToken
        }
    })
}