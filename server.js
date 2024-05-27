"use strict";
require("dotenv").config();
// dependencies
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

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

// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://main.d4xzmzjmre0h4.amplifyapp.com/', // Add other allowed origins here
];

// Configure CORS
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      // If the origin is in the allowedOrigins array, allow the request
      callback(null, true);
    } else {
      // If the origin is not in the allowedOrigins array, reject the request
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(projectRoutes);

app.get("/", function (req, res) {
  return res.send({"message": "Let's party!"});
});

// health check
app.get('/api/health', (req, res, next) => {
  return res.send({status: "ok"})}
);

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!\nEnvironment: ${process.env.NODE_ENV}`);
});
