// RUF
import axios from 'axios';

const URL = "http://localhost:3000/api/nft/create";

import data from './old_NFT_collection.json' assert { type: 'json' };

data.forEach((ele) => {
    const nft = {
        is_public: true,
        IPFS_hash: ele.IPFS_hash,
        NFT_token_ID: ele.NFT_token_ID,
        title: ele.title,
        description: ele.description,
        media_type: ele.media_type,
        date_created: ele.date_created,
        creator_metamask_ID: ele.creator_metamask_id,
        owner_metamask_ID: ele.owner_metamask_id,
        tags: [],
        price: ele.price,
    };
    axios.post(URL,{nft}).then((response)=>{
        console.log(response.data);
    }).catch((err)=>{
        console.log(err);
    })
})
