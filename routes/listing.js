var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");


router.get("/description", function(req, res, next) {
  res.render("listing");
});

//post the content of the selected item in the list and load the descriptionOffre view
router.post("/detail", function(req, res, next) {
  console.log(req.body.offersId);
  //json format
  var dataString = JSON.stringify({
    //the query has a filter to choose the selected item
    query:
      `
      
    { 
      poi(filters: [{dc_identifier:{_eq:` + req.body.offersId + `}}]) 
       
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
  //call the VPS to post data and load the view with the posted data
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

//get the content of the list and load the listing view
router.get("/", function(req, res, next) {
  console.log("get");
  //JSON format
  var dataString = JSON.stringify({
    //the query has a filter to choose types
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
  //call the VPS to get data and load the view with it
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

//post the content of the list and load the listing view
router.post("/", function(req, res, next) {
  console.log(req.body.searchBar);

  console.log(req.body.sliderPoi);
  //JSON format
  var dataString = JSON.stringify({
    //the query has a filter to choose types
    query:
      `
      
    { 
      poi (size:` +
      req.body.sliderPoi +
      ` ,filters:[{
        isLocatedAt: {
          schema_address:{
            schema_addressLocality:{_in:[` +
      req.body.searchBar +
      `]} 
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
  //call the VPS to post data and load the view with the posted data
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
      });
    });
});

module.exports = router;
