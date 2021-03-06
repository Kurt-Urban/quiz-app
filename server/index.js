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
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .catch((err) => console.log(err));

const quizModel = mongoose.model(
  "quizes",
  new mongoose.Schema({
    question: String,
    answer: String,
    options: Array,
    img: String,
    votes: [0, 0, 0, 0],
  })
);

app.post("/quizes", (req, res) => {
  quizModel.aggregate(
    [{ $sample: { size: req.body.quizLength } }],
    (error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    }
  );
});

app.post("/stats", (req, res) => {
  quizModel.find({ _id: { $in: req.body.id } }, (error, result) => {
    if (error) {
      res.send(error);
    }
    res.send(result);
  });
});

app.post("/new", (req, res) => {
  quizModel.create(req.body, (error, result) => {
    if (error) {
      res.send(error);
    }
    res.send(result);
  });
});

app.post("/update", async (req, res) => {
  const { votes } = await quizModel.findById(req.body.id);
  votes[req.body.voteIndex] += 1;
  quizModel.findByIdAndUpdate(
    { _id: req.body.id },
    { votes },
    (error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    }
  );
});

app.listen(port, () => {
  console.log("Connected to express");
});
