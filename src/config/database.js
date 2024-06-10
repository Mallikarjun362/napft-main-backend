// LIBRARY IMPORTS
import mongoose from "mongoose";
// APPLICATION IMPORTS
import { MAIN_MONGODB_URI, OLD_MONGODB_URI } from '../utils/constants.js';

mongoose.set('strictQuery', true);
const connection = mongoose.createConnection(OLD_MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default connection;