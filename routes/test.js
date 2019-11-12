var express = require("express");
var router = express.Router();
var https = require("https");
var fetch = require("node-fetch");

// Call API

router.get("/test/:activityId", function(req, res, next) {
  console.log();
  var dataString = JSON.stringify({
    query:
      `
      {
        poi(
          filters: [{rdf_type: {_in: ["https://www.datatourisme.gouv.fr/ontology/core#`+ req.param.activityId +`"]}}]
        ) {
          results {
            _uri
            rdfs_label {
              value
            }
            dc_identifier
            isLocatedAt {
              schema_address {
                schema_streetAddress
                schema_postalCode
                schema_addressLocality
              }
              schema_openingHoursSpecification {
                schema_opens
                schema_closes
                schema_dayOfWeek {
                  rdfs_label {
                    value
                  }
                }
              }
              schema_geo {
                schema_latitude
                schema_longitude
              }
            }
            hasContact {
              schema_email
              schema_telephone
              schema_faxNumber
              schema_legalName
            }
            hasBookingContact {
              schema_logo
              schema_email
              schema_telephone
              schema_faxNumber
              schema_legalName
            }
            isEquippedWith {
              rdfs_label {
                value
              }
            }
            hasFeature {
              internetAccess
              airConditioning
              petsAllowed
              charged
              noSmoking
            }
            hasMainRepresentation {
              ebucore_hasRelatedResource {
                ebucore_locator
              }
            }
            rdf_type
            hasDescription {
              shortDescription {
                value
                lang
              }
              dc_description {
                lang
                value
              }
            }
            offers {
              schema_priceSpecification {
                schema_priceCurrency
                hasPricingMode {
                  rdfs_label {
                    lang
                    value
                  }
                }
                hasEligiblePolicy {
                  rdfs_label {
                    value
                  }
                }
                hasEligibleAudience {
                  rdfs_label {
                    value
                  }
                  schema_requiredGender {
                    rdfs_label {
                      value
                    }
                  }
                  rdfs_label {
                    value
                  }
                }
                schema_price
              }
              schema_acceptedPaymentMethod {
                rdfs_label {
                  value
                }
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
      console.log(data), res.render("test", { data: data.data.poi.results[0] });
    });
});

module.exports = router;