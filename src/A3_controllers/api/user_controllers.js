import user_model from "../../B1_models/user_model.js";
import { v4 as uuidv4 } from "uuid";
import { verifySignature } from "../../C2_utils/higher_level_functions.js";
import { jwt_secret_key } from "../../C2_utils/constants.js";
import jwt from "jsonwebtoken";
import NFT_model from "../../B1_models/nft_model.js";
import Web3 from 'web3';


export async function user_connect_1(req, res) {
    // Generates Nounce and send
    const metamask_ID = req.body.metamask_ID;
    let the_user = null;
    await user_model.findOne({ metamask_ID }).then(async (user) => {
        if (user) {
            // If User Already Exists
            the_user = user;
            the_user.meta_data.nounce = uuidv4();
            the_user.save()
        } else {
            // If its a New User
            // Create New User
            the_user = user_model({
                metamask_ID: metamask_ID,
                meta_data: {
                    nounce: uuidv4(),
                    account_type: "PENDING",
                }
            });
            await the_user.save();
        };
    }).catch(err => console.log(err));
    return res.status(200).json({ nounce: the_user.meta_data.nounce });
};

export async function user_connect_2(req, res) {
    // Generates new JWT
    try {
        const { signature, metamask_ID } = req.body;
        const the_user = await user_model.findOne({ metamask_ID });
        const isValid = verifySignature(metamask_ID, signature, the_user.meta_data.nounce);
        if (isValid) {
            const token = jwt.sign({ id: the_user.metamask_ID }, jwt_secret_key, { expiresIn: '1h' });
            the_user.meta_data.account_type = "VERIFIED";
            the_user.save();
            return res.json({ token });
        } else {
            return res.status(400).json({ msg: "Invalid User Credentials" });
        }
    } catch (err) {
        return res.status(400).send({ msg: `ERROR ${err}` });
    }
};
export function user_details_get(req, res) { };
export function user_details_update(req, res) { };

export async function user_owned_nfts_get(req, res) {
    // REQUIRED INPUT
    // 1. USER_METAMASK_ID
    const { user_metamask_ID } = req.body;
    // console.log(user_metamask_ID);
    // const query = await NFT_model.find({ 'section_basic_info.owner_metamask_ID': "0x" + user_metamask_ID.slice(2).toUpperCase() }).select(`IPFS_hash NFT_token_ID section_price_info section_basic_info`).exec();
    const regexSearchTerm = new RegExp(user_metamask_ID, "i");
    const query = await NFT_model.find({
        'section_basic_info.owner_metamask_ID': regexSearchTerm
    }).select(`IPFS_hash NFT_token_ID section_price_info section_basic_info`).exec();
    // console.log(data);
    return res.send({ owned_nfts: query });
};