import express from 'express';
import { user_login,user_details_get,user_details_update } from '../../A3_controllers/api/user_controllers.js';
const router = express.Router();
router.route('/').get((req,res)=>res.json({message:"This is a route to access User related information"})); // Simple
router.route('/login').post(user_login); // Complex
router.route('/details_get').post(user_details_get); //Simple
router.route('/details_update').post(user_details_update); // Complex
export default router;
