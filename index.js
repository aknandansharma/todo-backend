import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import connectDB from "./config/db.js";

// .env configure.
dotenv.config();

// express init
const app = express();


//database config
connectDB();

// middlewares
app.use(cors());
app.use(express.json());


// rest api check on the web.
app.get("/", (req, res) => {
    res.send(`<h1>This is Task Management backend</h1>`);
})

// Port 
const PORT = 8080;

// run listen.
app.listen(PORT, () => {
    console.log(`Server Running on the PORT ${PORT}`.bgGreen.white);
})

// this is backend