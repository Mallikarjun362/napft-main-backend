import mongoose from 'mongoose';
import NFT_model from '../../src/B1_models/nft_model.js';
const uri = "mongodb+srv://napftadmin:napftadmin@cluster0.4xthvhw.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri);

NFT_model.findOne({NFT_token_ID:49}).then((nft)=>console.log(nft.section_services_info.resnet50_lantent_space_vector));

