# napft-main-backend

## Routes (API end points)
1. `/api`
    1. `/nft` : NFT related api.
        1. `/nft_detail` : To get complete details of a specific nft
        1. `/range_of_nfts` : To get a set of nft overview details.
        1. `/recent_nfts` : To get recently created nft's details.
        1. `/create` : To create a new nft.
        1. `/generate_embeddings` : To generate ResNet50 Embeddings for a NFT (If its a image file)
        1. `/update` : To update details of a nft.
        1. `/like` : To like a nft
        1. `/change-visibility` : To change visibility of a nft in marketplace page from public to private and vise versa.
        1. `/comment` : To add a comment for an nft. 
        1. `/delete-comment` : To delete a comment.
    1. `/user`
        1. `connect_1` : For initial Authorization purpose.
        1. `connect_2` : Issuing of JWT Token.
        1. `details_get` : Get the details of a user. This includes liked nfts, purchaced and created nfts.
        1. `details_update` : Update a users details like display name.
        1. `/get_user_owned_nfts` : Get nfts that are owned by this user that made the request.

## MongoDB Database Models
1. `NFT Schema`
    1. `IPFS_hash` : SHA-256 hash of the file stored in IPFS (Inter Planatary File System)
    1. `NFT_token_ID` : Integer token ID of the NFT on blockchain.
    1. `is_public` : Boolean value to store visibility on the website.
    1. `section_price_info` : Sub document containing price related data.
        1. `price_timeline` : Array of price change events to visualize. 
        1. `transaction_history` : Array of transaction of ownership of this nft. 
    1. `section_basic_info` : Basic information about the nft.
        1. `title` : Title of the nft.
        1. `description` : Description of the nft.
        1. `media_type` : File type of the nft. (image, audio, video)
        1. `date_created` : Timestamp.
        1. `creator_metamask_ID` : Metamask id of the creator.
        1. `owner_metamask_ID` : Metamask id of the current owner.
    1. `section_additional_info`:
        1. `tags` : Array of strings.
        1. `vote_count` : Integer for counting likes.
        1. `total_view_count` : Number of times the nft was clicked.
        1. `comments` : Array of comments each containing the user metamask id, comment string and date of the comment.
    1. `section_services_info` :
        1. `resnet50_latent_space_vector` : Array of 2048 ingeres. (latent space embedding generated by ResNet50)
        1. `cached_resnet50_recommendations` : Similar nfts references.
1. `User Schame`
    1. `metamash_ID` : Unique metamask wallet id of the user.
    1. `meta_data` : Nounce used in JWT Authentication process.
    1. `user_name` : Unique user name.
    1. `user_profile_pic` : Profile pic image.
    1. `user_bio` : Description.
    1. `date_joined` : Date the user created the account.
    1. `recent_transactions` : Array of transactions made by the user.
    1. `wish_list` : Saved nfts.
    1. `liked_nfts` : Liked nfts.

# Primary Technology Stack :
1. `express` : Primary Backend Framework
1. `mongoose` : MongoDB ORM
1. `yarn` : Package Manager
1. `axios` : Networking (Making API calls)
1. `passport` : Standard Authentication Library.
1. `passport-jwt` : JWT Authentication extension.

# Links
1. **Frontend Github Repo** : [https://github.com/Mallikarjun362/napft-frontend](https://github.com/Mallikarjun362/napft-frontend)
1. **Backend Github Repo (Main)** : [https://github.com/Mallikarjun362/napft-main-backend](https://github.com/Mallikarjun362/napft-main-backend)
1. **Django Dackend Github Repo** : [https://github.com/Mallikarjun362/napft-django-backend](https://github.com/Mallikarjun362/napft-django-backend)
1. **Deployment** : [https://napft.vercel.app](https://napft.vercel.app/)