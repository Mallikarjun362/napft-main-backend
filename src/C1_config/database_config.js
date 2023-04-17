// Mongodb Database Configuration.
// Importing libraries
import mongoose from "mongoose";
import {main_mongodb_uri} from '../C2_utils/constants.js';

mongoose.set('strictQuery', true);
mongoose.connect(main_mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB-connection-success")).catch((err) => console.log("Error-MongoDB-connection", err));