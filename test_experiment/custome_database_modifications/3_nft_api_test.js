import mongoose from 'mongoose';
import NFT_model from '../src/B1_models/nft_model.js';
const uri = "mongodb+srv://napftadmin:napftadmin@cluster0.4xthvhw.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri);

const query = await NFT_model.findOne({NFT_token_ID:49}).exec();
const nft = {
    section_price_info:query?.section_price_info,
    section_basic_info:query?.section_basic_info,
    section_additional_info:query?.section_additional_info,
    _id: query?._id,
    IPFS_hash:query?.IPFS_hash,
    NFT_token_ID:query?.NFT_token_ID,
    is_public:query.is_public
}
console.log(query);