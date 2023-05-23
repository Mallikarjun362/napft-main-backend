// import NFT_model from "../../../src/B1_models/nft_model.js";
import NFT_model from "../../src/B1_models/nft_model.js";
import { euclidean } from "ml-distance/lib/distances.js";
async function generate_recomendations({ vec, NFT_token_ID }) {
    if (vec.length != 2048) {
        return [];
    }
    // console.log(vec);
    console.log("generate Recommendations");
    const query = await NFT_model.find({ "section_services_info.resnet50_lantent_space_vector": { $ne: [] }, "NFT_token_ID": { $ne: NFT_token_ID } }).select({ 'section_services_info.resnet50_lantent_space_vector': 1, 'NFT_token_ID': 1 }).sort({ _id: -1 }).limit(20).exec();
    // console.log(query.length);
    // console.log(query);
    let list_of_nfts_recc = []
    for (let nft of query) {
        let obj = { NFT_token_ID: nft.NFT_token_ID, red_ID: nft._id };
        obj.distance = euclidean(vec, nft.section_services_info.resnet50_lantent_space_vector);
        list_of_nfts_recc.push(obj)
    }
    console.log(list_of_nfts_recc);
    return null
    // Retrive all the Documents 
}

const query = await NFT_model.findOne({ NFT_token_ID: 49, }).select({ 'section_services_info.resnet50_lantent_space_vector': 1, 'NFT_token_ID': 1 });
generate_recomendations({ vec: query?.section_services_info.resnet50_lantent_space_vector, NFT_token_ID: query?.NFT_token_ID });
// generate_recomendations()