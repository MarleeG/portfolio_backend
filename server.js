"use strict";
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();
const projectRoutes = require("./routes");
let dbURI = "";

const { DB_USER, DB_PASSWORD } = process.env;
let user = DB_USER;
let password = DB_PASSWORD;

function connectDatabase(databasePlatform) {
  dbURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-fgs8h.mongodb.net/website-portfolio?retryWrites=true&w=majority`;
}

connectDatabase("atlas");

const URI = process.env.MONGODB_URI || dbURI;

async function connect() {
  try {
    mongoose.connect(
      URI,
      {
        user: user,
        pass: password,
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (err) {
        if (err) {
          console.log("err", err);
        } else {
          console.log("woohoo");
        }
      }
    );
  } catch (err) {
    console.log("ERROR:: ", err);
  }
}

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(projectRoutes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// health check
app.get('/api/checkHealth', (req, res, next) => {
  return res.send({status: "ok"})}
);

// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.get("/", function (req, res) {
  return res.send({"message": "Let's party!"});
});


app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// for SSL certificate
// greenLock
//   .init({
//     packageRoot: __dirname,
//     configDir: "./greenlock.d",
//     // contact for security and critical bug notices
//     maintainerEmail: "marleegerard@gmail.com",
//     // whether or not to run at cloudscale
//     cluster: false,
//   })
//   .serve(app);