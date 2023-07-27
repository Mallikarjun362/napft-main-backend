import express from "express";
// Importing other routers
import { default as router_nft } from './api/nft.js';
import { default as router_user } from './api/user.js';

const router = express.Router();

router.route("/").get((req, res) => res.send("<h1>Napft Expressjs backend</h1>"));
router.route("/test").get((req, res) => {
    if ("count" in req.session) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    console.log(req.session);
    return res.send(`<h1>Test Route ${req.session.count}</h1>`)
});

router.use('/api/nft', router_nft);
router.use('/api/user', router_user);

export default router;