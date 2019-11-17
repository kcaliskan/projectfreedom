const express = require("express");
const passport = require("passport");
const path = require("path");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

// Init Middleware
// When we get reques to one of our routes, we convert the JSON body to object
app.use(express.json({ extended: false }));

// We create a new instance of Google Strategy.
passport.use(new GoogleStrategy());

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
