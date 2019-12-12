const express = require("express");
const app = express();

app.use('/api/bags', require("./bags"));
app.use('/api', require("./mail"));

module.exports = app;