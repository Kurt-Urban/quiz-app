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
    "mongodb+srv://kurban:12397@cluster0.hxtev.mongodb.net/mongo-database?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch((err) => console.log(err));

const quizModel = mongoose.model(
  "quizes",
  new mongoose.Schema({
    question: String,
    answer: String,
    options: Array,
    votes: Number,
  })
);

app.get("/quizes", (req, res) => {
  quizModel.find({}, (error, result) => {
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
