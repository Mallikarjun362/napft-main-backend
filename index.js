// Importing Libraries
// Primary Libraries
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import morgan from "morgan";
import passport from "passport";
// import session from "express-session";
// import MongoStore from "connect-mongo";

// Application Components
import { default as main_router } from './src/A1_routes/index_routes.js'; // Router
import passport_config from "./src/C1_config/passport.js";
import { PORT, jwt_secret_key } from "./src/C2_utils/constants.js"; // Application Constants
import "./src/C1_config/database_config.js"; // Configuration
// import { main_mongodb_uri } from "./src/C2_utils/constants.js";

passport_config(passport);

// const sessionStore = new MongoStore({
//     // mongooseConnection: connection,
//     mongoUrl: main_mongodb_uri,
//     collectionName: 'sessions',
// })
// Create Express App
const app = express()


// Main Code Starts here.
// Using basic middleware
/// Parses JSON payload
// const second = 1000;
// const minute = 60 * second;
// const hour = 60 * minute;
// app.use(session({
//     secret: jwt_secret_key,
//     cookie: { maxAge: hour },
//     saveUninitialized: false,
//     resave: false,
//     store: sessionStore,
// }))
app.use(morgan('tiny')); // Logger
app.use(passport.initialize()) // passport JWT Authentication
app.use(express.json()); // Parses the body if its in JSON format.
app.use(bodyParser.urlencoded({ extended: true })); // IDK
app.use(cors()); // IDK
app.use(main_router); // Using Main Router as middleware which handles all the traffic.

app.listen(PORT, () => { console.log(`Running and http://localhost:${PORT}`) }); // Running the express app.