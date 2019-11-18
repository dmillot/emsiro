var express = require("express");
var router = express.Router();
var app = express();
var https = require("https");
var fetch = require("node-fetch");


router.get("/", function(req, res, next) {
  res.send("api");
});

app.get("/:uri", (request, response) => {
  const uri = String(request.params.uri);
  if (!uri) {
    response.status(500).send("rien trouvé");
  } else {
    response.json(uri);
  }
});

module.exports = router;