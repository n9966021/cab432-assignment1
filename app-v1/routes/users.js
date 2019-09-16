var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
newsAPI.v2.topHeadlines({
  q: 'trump',
  category: 'politics',
  language: 'en',
  country: 'us'
}).then(res => {
  console.log(res);
});

*/
module.exports = router;
