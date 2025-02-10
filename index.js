import express from "express";
import axios from "axios";
import dotenv from "dotenv";

const app = express();
const port = 3000;

var date = "dd/mm/yyyy";
var selectedMedia = {};

dotenv.config();
const API_KEY = process.env.API_KEY;
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
console.log(API_URL);

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    try{
        const response = await axios.get(API_URL);
        const result = response.data;
        res.render("index.ejs", {
            mediaType: result.media_type,
            image: result.hdurl,
            video: result.url,
            date: result.date,
            explanation: result.explanation,
            title: result.title,
            selectedMediaType: selectedMedia.media_type,
            selectedMedia: selectedMedia.url,
            date: date
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

app.get("/submit", async (req, res) => {
    try{
        // Check if the randomize button was clicked
        if (req.query.action === "randomize") {
            const response = await axios.get(`${API_URL}&count=1`);
            selectedMedia = response.data[0];  
            date = selectedMedia.date;
        } else {
            // Date was selected
            date = req.query.date;
            const response = await axios.get(`${API_URL}&date=${date}`);
            selectedMedia = response.data;
        }
        res.redirect("/");
    } catch (error) {
        if (error.response.status >= 400 && error.response.status < 500) {
            // Handles dates outside scope
            selectedMedia = {};
            res.redirect("/");
        } else {
            console.log(error.response.status);
            console.log(error.response.statusText);
            res.render("index.ejs", {
                errorStatus: error.response.status,
                errorText: error.response.statusText
            });
        }
    }
});

app.listen(port, () => {
    console.log(`Server listening to port: ${port}`);
});