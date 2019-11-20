var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
var types = require("../public/javascripts/type");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('listing', { title: 'Express', elements: [{ id: 1, value: 'premier' },{ id: 2, value: 'second' }] });
// });

router.get("/description", function(req, res, next) {
  res.render("listing");
});





//send the content of the current item selected in the list
router.post("/detail", function(req, res, next) {
  console.log(req.body.offersId);
  var dataString = JSON.stringify({
    query: `
      
    { 
      poi(filters: [{dc_identifier:{_eq:`+req.body.offersId+`}}]) 
       
              { 
              results {
                _uri,
                dc_identifier,
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





//get the content
router.get("/", function(req, res, next) {
  console.log("get");
  var dataString = JSON.stringify({
    query: `
      
    { 
      poi (
       filters:[
      
      {
      rdf_type: {_in: [
          "https://www.datatourisme.gouv.fr/ontology/core#Festival",               
          "https://www.datatourisme.gouv.fr/ontology/core#ShowEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#CulturalEvent",   
          "https://www.datatourisme.gouv.fr/ontology/core#EntertaimnentAndEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#SportsEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#ChildrensEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#SaleEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#TheaterEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#CircusEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#SocialEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#BusinessEvent"

     
          ] 
        }
    }]
      ) 
            { 
                
              results {
                _uri,
                dc_identifier,
                rdf_type,
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


//get the content with filters
router.post("/", function(req, res, next) {
  console.log(req.body.searchBar);

  console.log(req.body.sliderPoi);

  var dataString = JSON.stringify({
    // ` + res.locals.sliderPOI + `
    query:
      `
      
    { 
      poi (size:` +
      req.body.sliderPoi +
      ` ,filters:[{
        isLocatedAt: {
          schema_address:{
            schema_addressLocality:{_in:[`+req.body.searchBar+`]} 
          }
        }
      },
      
      {
      rdf_type: {_in: [
          "https://www.datatourisme.gouv.fr/ontology/core#Festival",               
          "https://www.datatourisme.gouv.fr/ontology/core#ShowEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#CulturalEvent",   
          "https://www.datatourisme.gouv.fr/ontology/core#EntertaimnentAndEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#SportsEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#ChildrensEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#SaleEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#TheaterEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#CircusEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#SocialEvent",
          "https://www.datatourisme.gouv.fr/ontology/core#BusinessEvent"

     
          ] 
        }
    }]
      ) 
            { 
                
              results {
                _uri,
                dc_identifier,
                rdf_type,
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
      res.render("listing", {
        data: data.data.poi.results
        // , type: types.allType()
      });
    });
});

module.exports = router;
