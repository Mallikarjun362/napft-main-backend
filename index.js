// Importing Libraries
// Primary Libraries
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from "morgan";

// Application Components
import { default as main_router } from './src/A1_routes/index_routes.js'; // Router
import { PORT } from "./src/C2_utils/constants.js"; // Application Constants
import './src/C1_config/database_config.js'; // Configuration
// Create Express App
const app = express()













// Main Code Starts here.
// Using basic middleware
/// Parses JSON payload
app.use(morgan('tiny')); // Logger
app.use(express.json()); // Parses the body if its in JSON format.
app.use(bodyParser.urlencoded({ extended: true })); // IDK
app.use(cors()); // IDK
app.use(main_router); // Using Main Router as middleware which handles all the traffic.

app.listen(PORT, () => { console.log(`Running and http://localhost:${PORT}`) }); // Running the express app.