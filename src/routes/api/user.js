import express from 'express';
import { user_connect_1, user_connect_2, user_details_get, user_details_update, user_owned_nfts_get } from '../../controllers/api/user.js';
import { authorize_user } from '../../middleware/authentication.js';
const router = express.Router();
router.route('/').get((req, res) => res.json({ message: "This is a route to access User related information" })); // Simple
router.route('/connect_1').post(user_connect_1); // Complex
router.route('/connect_2').post(user_connect_2); // Complex
router.route('/details_get').post(user_details_get); //Simple
router.route('/details_update').post(user_details_update); // Complex

router.route('/get_user_owned_nfts').post(authorize_user, user_owned_nfts_get)

export default router;
