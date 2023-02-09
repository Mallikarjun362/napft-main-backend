import mongoose from "mongoose";

mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://NapftDBA:hellonapftDBA@cluster0.oneh8cf.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB-connection-success")).catch((err) => console.log("Error-MongoDB-connection", err));

const NFTsSchema = new mongoose.Schema({
  NFT_token_ID: { type: Number, unique: true, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  IPFS_hash: { type: String, required: true },
  date_created: { type: Date, required: true },
  media_type: { type: String, required: true },
  primary_category: { type: String, required: true },
  owner_metamask_id: { type: String, required: true },
  creator_metamask_id: { type: String, required: true },

  tags: { type: [String], required: false, default: [] },
  votes: { type: [String], required: false, default: [] },
  description: { type: String, required: false, default: "" },
  transaction_history: { type: [{ metamask_id: String, timestamp: Date }], required: false, default: [] },
  price_timeline: { type: [{ timestamp: Date, price: Number }], required: false, default: [] },
  trend_number: { type: Number, required: false, default: 0 },
  image_feature_representation: { type: Object, required: false, default: {} },
  view_count: { type: Number, required: false, default: 0 },
  comments: { type: [Object], required: false, default: [] },
},
  {
    collection: "NFT",
  });
export const NFT_model = mongoose.model("NFT", NFTsSchema);