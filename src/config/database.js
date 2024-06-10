// LIBRARY IMPORTS
import mongoose from "mongoose";
// APPLICATION IMPORTS
import { TEST_MONGODB_URI, MAIN_MONGODB_URI, OLD_MONGODB_URI } from '../utils/constants.js';

mongoose.set('strictQuery', true);
const connection = mongoose.createConnection(TEST_MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default connection;