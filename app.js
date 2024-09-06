const express = require("express");
const app = express();

const router = require('./routes');

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "GET - root",
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

app.use('/api', router);

module.exports = app;
