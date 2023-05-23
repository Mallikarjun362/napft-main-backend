import mongoose from "mongoose";
import connection from "../C1_config/database_config.js";
const user_schema = mongoose.Schema({
    metamask_ID: { type: String, unique: true, required: true },
    user_name: { type: String, unique: false, required: false, default: "" },
    user_profile_pic: Buffer,
    user_bio: { type: String, default: "" },
    date_joined: { type: Date, default: Date.now },
    resent_transactions: {
        type: [{
            date: Date,
            from: String,
            to: String,
            ammount: String,
            type: String,
        }],
        default: [],
    },
    wish_list: {
        type: [{
            wishlist_name: String,
            wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NFT' }],
        }]
    },
    liked_nfts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NFT' }],
        default: [],
    },
});

const user_model = connection.model("User", user_schema);
export default user_model;