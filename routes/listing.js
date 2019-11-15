var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('listing', { title: 'Express', elements: [{ id: 1, value: 'premier' },{ id: 2, value: 'second' }] });
// });

router.get("/description", function(req, res, next) {
  res.render("listing");
});

router.get("/detail", function(req, res, next) {
  console.log();
  var dataString = JSON.stringify({
    query: `
      
    { 
      poi 
              { 
              results {
                _uri,
                rdfs_label {
                  value
                },
                 hasRepresentation{
                
                  ebucore_hasRelatedResource{
                    ebucore_locator
                  }
                  } ,  
                takesPlaceAt{
                  startDate,
                  endDate
                },
                isLocatedAt {
                  schema_address {
                    schema_streetAddress,
                    schema_postalCode,
                    schema_addressLocality,

                  },
                  schema_geo{
                    schema_latitude,
                    schema_longitude
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
          }
      
          `
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
      res.render("descriptionOffre", { data: data.data.poi.results });
    });
});


router.get("/", function(req, res, next) {
  console.log();
  var dataString = JSON.stringify({
    query: `
      
    { 
      poi (size:100)
              { 
              results {
                _uri,
                rdfs_label {
                  value
                },
                 hasRepresentation{
                
                  ebucore_hasRelatedResource{
                    ebucore_locator
                  }
                  } ,  
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
          }
      
          `
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
      res.render("listing", { data: data.data.poi.results });
    });
});

module.exports = router;
