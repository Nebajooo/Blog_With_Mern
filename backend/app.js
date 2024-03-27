const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const db = require("./db/db");
const postRouter = require("./Routes/post");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());
const PORT = process.env.PORT || 3000;
app.use("/api/posts", postRouter);
app.listen(PORT, (req, res) => {
  console.log(`app is listening to PORT ${PORT}`);
});
