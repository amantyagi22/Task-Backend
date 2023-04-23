require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/api", route);

// Database connection
const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    app.listen(PORT);
    console.log(`Server started at ${PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
