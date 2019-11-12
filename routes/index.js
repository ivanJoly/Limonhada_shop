const express = require("express");
const app = express();

app.use(require("./bags"));

module.exports = app;