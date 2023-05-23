// Mongodb Database Configuration.
// Importing libraries
import mongoose from "mongoose";
import { main_mongodb_uri } from '../C2_utils/constants.js';

mongoose.set('strictQuery', true);
const connection = mongoose.createConnection(main_mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default connection;