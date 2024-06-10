// LIBRARY IMPORTS
import bodyParser from "body-parser";
import passport from "passport";
import express from "express";
import morgan from "morgan";
import cors from 'cors';

// APPLICATION IMPORTS
import { default as mainRouter } from './src/routes/index.js';
import passport_config from "./src/config/passport.js";
import { PORT } from "./src/utils/constants.js";
import "./src/config/database.js";

passport_config(passport);

const app = express()

app.use(morgan('tiny'));
app.use(passport.initialize());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(mainRouter);

app.listen(PORT, () => { console.log(`Running and http://localhost:${PORT}`) });