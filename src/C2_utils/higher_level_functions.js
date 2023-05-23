import NFT_model from "../B1_models/nft_model.js";
import { euclidean } from "ml-distance/lib/distances.js";

export async function generate_recomendations({ vec, NFT_token_ID }) {
    if (vec.length != 2048) {
        return [];
    }
    // console.log(vec);
    // console.log("generate Recommendations");
    const query = await NFT_model.find({ "section_services_info.resnet50_lantent_space_vector": { $ne: [] }, "NFT_token_ID": { $ne: NFT_token_ID } }).select({ 'section_services_info.resnet50_lantent_space_vector': 1, 'NFT_token_ID': 1 }).sort({ _id: -1 }).limit(20).exec();
    // console.log(query.length);
    // console.log(query);
    let list_of_nfts_recc = []
    for (let nft of query) {
        let obj = { NFT_token_ID: nft.NFT_token_ID, ref_ID: nft._id };
        obj.distance = euclidean(vec, nft.section_services_info.resnet50_lantent_space_vector);
        list_of_nfts_recc.push(obj)
    }
    list_of_nfts_recc.sort((a, b) => a.distance - b.distance);
    // console.log(list_of_nfts_recc);
    return list_of_nfts_recc.slice(0, 20);
    // Retrive all the Documents 
}

export function getDifferenceInDaysFromNow(t) {
    const targetDate = new Date(t);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - targetDate;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
}