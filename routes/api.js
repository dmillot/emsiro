var express = require('express');
var router = express.Router();
var app = express();

router.get('/', function(req, res, next) {
  res.send('api');
});


app.get('/:uri', (request, response) => {
    const uri = String(request.params.uri);
    if(!uri)
    {
        response.status(500).send('rien trouvé');
    }
    else{
        response.json(uri);
    }
});




module.exports = router;



[
    {
      "uri": 1
     
    },
    {
      "uri": 2
      
    },
    {
      "uri": 3
     
    }
]
