import NFT_model from "../../B1_models/nft_model.js";
import { django_rs_endpoint_url } from '../../C2_utils/constants.js';
import axios from 'axios';


export async function get_single_nft_detail(req, res) {
    // Query Information
    try {
        const query = await NFT_model.findOne({ NFT_token_ID: req.body?.NFT_token_ID }).exec();
        const nft = {
            section_price_info: query?.section_price_info,
            section_basic_info: query?.section_basic_info,
            section_additional_info: query?.section_additional_info,
            _id: query?._id,
            IPFS_hash: query?.IPFS_hash,
            NFT_token_ID: query?.NFT_token_ID,
            is_public: query.is_public
        }
        return res.status(200).json({ nft });
    } catch (err) {
        return res.status(400).json({ message: "ERROR Occured " });
    }
}
export async function get_range_of_nfts(req, res) {
    try {
        const query = await NFT_model.find({
            NFT_token_ID: {
                $gte: req.body.start,
                $lte: req.body.end
            }
        }).exec();
        const nfts = query.map(ele => ({
            section_price_info: ele?.section_price_info,
            section_basic_info: ele?.section_basic_info,
            section_additional_info: ele?.section_additional_info,
            _id: ele?._id,
            IPFS_hash: ele?.IPFS_hash,
            NFT_token_ID: ele?.NFT_token_ID,
            is_public: ele.is_public
        }))
        return res.status(200).json({ nfts: nfts });
    } catch (err) {
        return res.status(400).json({ message: "ERROR Occured" });
    }
}
export async function create(req, res) {
    let nft = undefined;
    // T1
    try {
        const ele = req.body.nft;
        // trying to create a valid NFT databse Object
        nft = {
            // base data cleaning
            // required
            IPFS_hash: ele.IPFS_hash,
            NFT_token_ID: ele.NFT_token_ID,
            title: ele.title,
            creator_metamask_ID: ele.creator_metamask_ID,
            owner_metamask_ID: ele.owner_metamask_ID,
            price: ele.price,
            // Optional
            is_public: ele.is_public,
            media_type: ele.media_type ? ele.media_type : 'image',
            description: ele.description ? ele.description : "",
            date_created: ele.date_created ? Date(ele.date_created) : Date.now(),
            tags: ele.tags ? ele.tags : [],
            // derived data
            price_timeline: [{ timestamp: Date(ele.date_created), price: ele.price, }],
            transaction_history: [{ metamask_ID: ele.creator_metamask_ID, timestamp: Date(ele.date_created) }],
        };
    } catch (err) {
        return res.status(400).send(`Please provide required fields${err}`);
    }
    // T2
    try {
        nft.resnet50_lantent_space_vector = await axios.post(django_rs_endpoint_url, { image_URL: "https://gateway.pinata.cloud/ipfs/" + nft.IPFS_hash }).then((response) => response.data.embeddings);
    } catch (err) {
        return res.status(400).send(`Error Generating embeddings ${err}`);
    }
    // 1. The user needs to be authenticated to create an NFT
    // 2. needs to provide the required information of an NFT
    // T3
    try {
        const new_nft_instance = new NFT_model({
            IPFS_hash: nft.IPFS_hash, // Required
            NFT_token_ID: nft.NFT_token_ID, // Required
            section_price_info: {
                price_timeline: nft.price_timeline,
                transaction_history: nft.transaction_history,
            },
            section_basic_info: {
                title: nft.title,
                description: nft.description,
                media_type: nft.media_type,
                date_created: nft.date_created,
                creator_metamask_ID: nft.creator_metamask_ID,
                owner_metamask_ID: nft.owner_metamask_ID,
            },
            section_additional_info: {
                tags: nft.tags,
                // votes_count: 0,
                // views: [],
                // comments: [],
            },
            section_services_info: {
                resnet50_lantent_space_vector: nft.resnet50_lantent_space_vector,
                // cached_resnet50_recommendations: []
            }
        });
        // Saving NFT to the database
        new_nft_instance.save().then((response) => {
            // 1. Call Django Server for Image Embedding generation
            res.status(200).json({ message: `NFT Successfully Saved in Database ${nft.title}`, });
        }).catch((err) => {
            res.status(400).send(`Error Occured while storing in data base, ${err}`);
        });
    } catch (err) {
        res.status(400).send("Error Occured in try-catch block 2");
    }
}
export function update(req, res) { }
export async function like(req, res) {
    try {
        const query = await NFT_model.findOneAndUpdate({ _id: req.body.ID }, { $inc: { 'section_additional_info.votes_count': 1 } }).exec();
        res.status(200).json({ message: "Successfully liked nft" });
    } catch (err) {
        res.status(400).json({ message: "NFT like unsuccessful", err });
    }
}
export function buy(req, res) { }
export async function change_visibility(req, res) {
    try {
        NFT_model.findById(req.body.ID).then((nft) => {
            nft.is_public = !nft.is_public;
            nft.save().then(() => {
                res.status(200).json({ message: "Change visibility successful" });
            }).catch((err) => {
                res.status(400).json({ message: "Change visibility unsuccessful" });
            })
        });
    } catch (err) {
        res.status(400).json({ message: "Change visibility unsuccessful" });
    }
}
export function comment(req, res) {
    try {
        NFT_model.updateOne(
            { _id: req.body.ID },
            {
                $push: {
                    "section_additional_info.comments": {
                        content: req.body?.content,
                        user_metamask_ID: req.body?.user_metamask_ID,
                        date: Date.now()
                    }
                }
            }).then(() => {
                res.status(200).json({ message: "Comment added successful" });
            }).catch(() => {
                res.status(400).json({ message: "Comment added unsuccessful" });
            });

    } catch (err) {
        res.status(400).json({ message: "Adding Comment unsuccessful" });
    }
}
export function delete_comment(req, res) {
    try {
        NFT_model.updateOne(
            { _id: req.body.ID },
            {
                $pull: {
                    "section_additional_info.comments": {
                        _id: req.body.comment_ID,
                    }
                }
            }).then(() => {
                res.status(200).json({ message: "Comment deleted successful" });
            }).catch((err) => {
                res.status(400).json({ message: "Comment deleted unsuccessful 1" });
            });

    } catch (err) {
        res.status(400).json({ message: "Adding deleted unsuccessful 2" });
    }
}