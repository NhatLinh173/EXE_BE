const express = require("express");
const cors = require("cors");
const app = express();

const whiteList = ["https://exe-fe.vercel.app/", "https://exe-be.onrender.com"];

const corsOptionLegate = (req, callback) => {
  var corsOption;
  if (whiteList.indexOf(req.header("Origin")) !== -1) {
    corsOption = { origin: true };
  } else {
    corsOption = { origin: false };
  }
  callback(null, corsOption);
};

exports.cors = cors();
exports.corsWithOption = cors(corsOptionLegate);
app.use(exports.corsWithOption);
