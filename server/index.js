const express = require("express")
const { resolve } = require("path")

const app = express()

app.use(express.static(resolve(__dirname, "../client")))

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "../client/index.html"));
});

app.get("/success", (req, res) => {
  res.sendFile(resolve(__dirname, "../client/success.html"));
});

app.get("/cancel", (req, res) => {
  res.sendFile(resolve(__dirname, "../client/cancel.html"));
});

app.listen(8080)
