import mongoose from 'mongoose';
import connection from '../config/database.js';
// Field Validators
const validate_price_timeline = (v) => v.length > 0;
const validate_transaction_history = (v) => v.length > 0;
const Validate_resnet50_lantent_space_vector = (v) => v.length === 0 | v.length === 2048;

/*
The NFT model contains these 5 sections 
0. Top level Information Section
    1. is Public 
1. Identity Information Section
    1. IPFS Hash
    2. Token ID
2. Price Information Section
    1. Price Time line
    2. Transaction history
3. Basic details Section
    1. Title
    2. Description
    3. Media Type
    4. Date Created
    5. Creator metamask ID
    6. Owmer metamsk ID
4. NFT additional info Section
    1. tags
    2. votes
    3. views
    4. comments
5. NFT services info Section: // Not by user
    1. resnet50_lantent_space_vector: Array of latent space representation
    2. cached_resnet50_recommendations: Array of other nft referances
*/
// `IPFS_hash NFT_token_ID section_price_info section_basic_info`

const NFT_schema = new mongoose.Schema({
    IPFS_hash: { type: String, required: true },
    NFT_token_ID: { type: Number, unique: true, required: true },
    is_public: { type: Boolean, default: true },
    section_price_info: {
        price_timeline: {
            type: [{ timestamp: Date, price: Number }],
            validate: {
                validator: validate_price_timeline,
                message: "The prise timeline needs to have atleast one record",
            },
            required: false,
        },
        transaction_history: {
            type: [{ metamask_ID: String, timestamp: Date }],
            validate: {
                validator: validate_transaction_history,
                message: "The Transaction history needs to have atleast one record",
            },
            required: false,
        },
    },
    section_basic_info: {
        title: { type: String, required: true },
        description: { type: String, required: false },
        media_type: { type: String, required: false, default: "image" },
        date_created: { type: Date, default: Date.now },
        creator_metamask_ID: { type: String, required: true },
        owner_metamask_ID: { type: String, required: true },
    },
    section_additional_info: {
        tags: { type: [String], default: [] },
        votes_count: { type: Number, default: 0 },
        total_view_count: { type: Number, default: 0 },
        views: { type: [{ date: Date, count: Number }], default: [] },
        comments: {
            type: [{
                content: String,
                user_metamask_ID: String,
                date: Date,
            }],
            default: [],
        }
    },
    section_services_info: {
        resnet50_lantent_space_vector: {
            type: [Number],
            validate: {
                validator: Validate_resnet50_lantent_space_vector,
                message: "Invalid length ResNET50-latent-space-vector"
            },
            default: []
        },
        // cached_resnet50_recommendations: {
        //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NFT' }],
        //     default: []
        // }
        cached_resnet50_recommendations: {
            type: [{
                created_on: Date,
                recommendations: [{
                    distance: Number,
                    NFT_token_ID: Number,
                    ref_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'NFT' }
                }]
            }],
            default: [],
        }
    }
});

const NFT_model = connection.model("NFT", NFT_schema);
export default NFT_model;