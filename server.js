const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
const path = require("path");

const app = express();

// Connect Database
connectDB();

// Init Middleware
// When we get reques to one of our routes, we convert the JSON body to object
// app.use(express.json({ extended: false }));

// app.use(passport.initialize());

///V2

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.send("API Running"));

//Auth routes handler
app.use("/api/auth", require("./routes/api/auth"));

//Auth routes handler
app.use("/api/user", require("./routes/api/user"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
