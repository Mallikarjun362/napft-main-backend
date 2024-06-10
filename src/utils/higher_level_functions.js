import NFT_model from "../models/nft.js";
import { euclidean } from "ml-distance/lib/distances.js";

export async function generate_recomendations({ vec = [], NFT_token_ID = [0] }) {
    // console.log("GENERATE - RECOMMENDATIONS");
    // console.log(vec, NFT_token_ID);
    if (vec.length !== 2048) {
        return [];
    }
    const query = await NFT_model.find({ "section_services_info.resnet50_lantent_space_vector": { $ne: [] }, "NFT_token_ID": { $ne: NFT_token_ID } }).select({ 'section_services_info.resnet50_lantent_space_vector': 1, 'NFT_token_ID': 1 }).sort({ _id: -1 }).limit(40).exec();
    let list_of_nfts_recc = []
    for (let nft of query) {
        let obj = { NFT_token_ID: nft.NFT_token_ID, ref_ID: nft._id };
        obj.distance = euclidean(vec, nft.section_services_info.resnet50_lantent_space_vector);
        list_of_nfts_recc.push(obj)
    }
    list_of_nfts_recc.sort((a, b) => a.distance - b.distance);
    return list_of_nfts_recc.slice(0, 20);
}

export function getDifferenceInDaysFromNow(t) {
    const targetDate = new Date(t);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - targetDate;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
}

export function getMostRecent({ lst, k = 'created_on' }) {
    let ele = lst[0];
    let eleDate = new Date(lst[0][k]);
    for (let index = 0; index < lst.length; index++) {
        const curr = lst[index];
        if ((new Date(curr[k])) > eleDate) {
            ele = curr;
            eleDate = new Date(curr[k]);
        }
    }
    return ele;
}

import sigUtil from 'eth-sig-util';
export function verifySignature(address, signature, message) {
    // Verify the signature
    const isValid = sigUtil.recoverPersonalSignature({
        data: message,
        sig: signature
    }) === address.toLowerCase();

    return isValid;
}