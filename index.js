// TODO:
// Choose an API for Project
// Create html tags for the API response
// Make it functional
// Style the Website
// Make it Web Responsive
// Push Project
// Include Readme.md
// Follow this Steps to publish to RENDER web server:
// https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/38892394#questions/20817356

import express from "express";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
const port = 3000;
const API_URL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

// dotenv.config();
// const apiKey = process.env.API_KEY;
// const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", async(req, res) => {
    try{
        const response = await axios.get(API_URL);
        const result = response.data;
        res.render("index.ejs", {
            mediaType: result.media_type,
            image: result.hdurl,
            video: result.url,
            date: result.date,
            explanation: result.explanation,
            title: result.title
        });
    } catch (error) {
        console.log(error.response.status);
        console.log(error.response.statusText);
        res.render("index.ejs", {
            errorStatus: error.response.status,
            errorText: error.response.statusText
        });
    }
});

app.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
});