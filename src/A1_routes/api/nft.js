import express from 'express';
import { get_single_nft_detail, get_range_of_nfts, create, update, like, buy, change_visibility, comment, delete_comment } from '../../A3_controllers/api/nft_controllers.js';
const router = express.Router();


// Public
/// GET = Requires No Input Information = Response independent of Input Information
router.route('/').get((req, res) => res.json({ message: "This is a route to access NFT related information" })); // Simple [X]
/// POST = Requires Input Information (from Body) = Response Depends of Input Information
router.route('/nft_detail').post(get_single_nft_detail); // Simple [X]
router.route('/range_of_nfts').post(get_range_of_nfts); // Complex [X]
router.route('/create').post(create); // Simple [X]

router.route('/update').post(update); // Complex [-]
router.route('/like').post(like); // Simple [X]
router.route('/buy').post(buy); // Simple
router.route('/change-visibility').post(change_visibility); // Simple
router.route('/comment').post(comment); // Simple
router.route('/delete-comment').post(delete_comment); // Simple

// Protected


// Export
export default router;