// Importing Libraries
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import {default as main_router} from './A1_routes/index_routes.js';
import { PORT } from "./C2_utils/constants.js";
import './C1_config/database_config.js'
// Create Express App
const app = express()

// Using basic middleware
/// Parses JSON payload
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(main_router);

app.listen(PORT,()=>{console.log(`Running and http://localhost:${PORT}`)});