import express from 'express';
import { authorize_user } from '../../A2_middleware/authentication_middleware.js';
import { get_single_nft_detail, get_range_of_nfts, get_recent_nfts, create, update, like, buy, change_visibility, comment, delete_comment, generate_embeddings } from '../../A3_controllers/api/nft_controllers.js';
const router = express.Router();

// RESOURCE = NFT
// ACTIONS :
// 1. CREATE NFT [_]
// 2. UPDATE NFT [_]
// 3. LIKE NFT [_]
// 4. UN-LIKE NFT [_]
// 5. COMMENT NFT [_]
// 6. UN-COMMENT NFT [_]
// 7. TOGGLE VISIBILITY OF NFT [_]
// 8. BUY NFT [_]
// 9. GET SINGLE NFT DETAILS [_]
// 10. GET RANGE OF NFT DETAILS [_]

// Public
/// GET = Requires No Input Information = Response independent of Input Information
router.route('/').get((req, res) => res.json({ message: "This is a route to access NFT related information" })); // Simple [X]
/// POST = Requires Input Information (from Body) = Response Depends of Input Information
router.route('/nft_detail').post(get_single_nft_detail); // Simple [X]
router.route('/range_of_nfts').post(get_range_of_nfts); // Complex [X]
router.route('/recent_nfts').post(get_recent_nfts); // Complex [X]
// PROTECTED
// router.route('/create').post(authorize_user, create); // Simple [X]
router.route('/create').post(create); // Simple [X]
router.route('/generate_embeddings').post(authorize_user, generate_embeddings); // Simple [X]
router.route('/update').post(authorize_user, update); // Complex [-]
router.route('/like').post(authorize_user, like); // Simple [X]
router.route('/buy').post(authorize_user, buy); // Simple
router.route('/change-visibility').post(authorize_user, change_visibility); // Simple
router.route('/comment').post(authorize_user, comment); // Simple
router.route('/delete-comment').post(authorize_user, delete_comment); // Simple

// SINGLE EXPORT
export default router;