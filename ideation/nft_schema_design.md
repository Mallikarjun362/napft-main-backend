- NFT
  1. __Title__ : Title of the NFT.
  2. __NFT token ID__ : Tokem ID of the NFT on the blockchain
  3. __Date Created__ : The day at which the nft was created.
  4. __Media Type__ : What File type it is.

# NFT information sections:
1. [X] Identity Details (Can be Search Indexes)
    1. [X] __IPFS Hash__ : String - required
    2. [X] __Token ID__ : Number - required
2. [X] Price Information
    1. [X] __Price Time line__ : default : [] - constraints len > 0
    2. [X] __Transaction history__ : List < user meta mash ID , Purchase Date > : default : [] - constraints : len > 0
3. [X] Basic details
    1. [X] __Title__ : required 
    2. [X] __Description__ : optional
    3. [X] __Media Type__ : required
    4. [X] __Date Created__ : required
    5. [X] __Creator metamask ID__ : required
    6. [X] __Owmer metamsk ID__ : required
4. [X] NFT additional info
    1. [X] __tags__ : default = []; List of strings provided by user
    2. [X] __votes__ : defaukt = []; List of users
    3. [X] __views__ : { DateString : Count }
    4. [X] __comments__
5. [X] NFT services info:
    1. [X] __resnet50_lantent_space_vector__ : Array of latent space representation
    2. [X] __cached_resnet50_recommendations__ : Array of other nft referances

# Convenctions
- Using a list to represent a timeline of the price information.
    - price_timeline_info : <Timestamp,Price,OwnerID>[]

