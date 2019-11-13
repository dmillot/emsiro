var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");

// Call API

router.get("/", function(req, res, next) {
  console.log();
  var dataString = JSON.stringify({
    query:
      `
      {
        poi 
        { 
        results {
          _uri,
          rdfs_label {
            value
          },
          takesPlaceAt{
            startDate,
            endDate
          },
          isLocatedAt {
            schema_address {
              schema_streetAddress,
              schema_postalCode,
              schema_addressLocality
            },
            schema_geo{
              schema_latitude schema_longitude
            }
          },
          hasDescription {
            shortDescription {
              value,
              lang
            },
            dc_description {
              lang,
              value
            }
          }
        }
      }
    }`
  });
  fetch("http://vps.cours-diiage.com:8080", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: dataString
  })
    .then(r => r.json())
    .then(data => {
    res.render("test", { data: data.data.poi.results });
    });
});

module.exports = router;
