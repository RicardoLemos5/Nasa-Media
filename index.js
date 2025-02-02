// TODO:
// Choose an API for Project
// Create html tags for the API response
// Make it functional
// Style the Website
// Make it Web Responsive
// Push current Project and previous Project to GitHub
// Include Readme.md file for both
// Follow this Steps to publish to RENDER web server:
// https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/38892394#questions/20817356

import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = ""; // Choose an API for Project

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

// Use axios / await
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
});