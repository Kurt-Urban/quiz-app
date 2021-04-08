const env = require("dotenv").config().parsed;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser());

mongoose
  .connect(
    `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@cluster0.hxtev.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch((err) => console.log(err));

const quizModel = mongoose.model(
  "quizes",
  new mongoose.Schema({
    question: String,
    answer: String,
    options: Array,
    img: String,
    votes: Array,
  })
);

app.get("/quizes", (req, res) => {
  quizModel.aggregate([{ $sample: { size: 10 } }], (error, result) => {
    console.log(result);
    res.send(result);
  });
});

app.post("/new", (req, res) => {
  quizModel.create(req.body, (error, result) => {
    res.send(result);
  });
});

app.listen(port, () => {
  console.log("Connected to express");
});
