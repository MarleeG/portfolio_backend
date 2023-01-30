"use strict";
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();
const projectRoutes = require("./routes");


const { DB_USER, DB_PASSWORD } = process.env;
const user = DB_USER;
const password = DB_PASSWORD;

async function connectDatabase() {
  mongoose.set('strictQuery', false);
  const dbURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-fgs8h.mongodb.net/website-portfolio?retryWrites=true&w=majority`;

  const URI = process.env.MONGODB_URI || dbURI;

  try {
    mongoose.connect(
      URI,
      {
        user: user,
        pass: password,
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log('Database connected!')
  } catch (err) {
    console.log("ERROR:: ", err);
  }


}

connectDatabase();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(projectRoutes);

app.get("/", function (req, res) {
  return res.send({"message": "Let's party!"});
});

// health check
app.get('/api/checkHealth', (req, res, next) => {
  return res.send({status: "ok"})}
);

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
