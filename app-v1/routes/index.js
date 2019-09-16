require('dotenv').config();
var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
function doStuff(rsp) {
  articles = [];
  for (let i = 0; i < rsp.articles.length; i++) {
    var hold = rsp.articles[i]
    articles.push( {
      //source: hold.source,
      author: hold.author,
      title: hold.title,
      description: hold.description,
      url: hold.url,
      urlToImage: hold.urlToImage,
      publishedAt: hold.publishedAt,
      //content: hold.content

    });
  }
  return articles;
  }
 
router.get('/', (req, res, next) => {
  res.render('index');
})

router.get('/newsapi', (req, res, next) => {
  res.render('newsapi');
});

router.post('/newsapi', async (req, res, next) => {
  var keywords = req.body.keywords;
  var dateFrom = req.body.dateFrom;
  var dateTo = req.body.dateTo;
  var sortBy = req.body.sortBy;
  const base = 'https://newsapi.org/v2/everything?'
  try{
    const url = `${base}q=${keywords}&dateFrom=
    ${dateFrom}&to=${dateTo}&sortBy=${sortBy}
    $&apiKey=${process.env.NEWS_KEY}`;
    console.log(`Keywords ${keywords} 
    dateFrom ${dateFrom} 
    dateTo ${dateTo} 
    sortBy ${sortBy}`);
    const url2 = "https://newsapi.org/v2/everything?q=apple"
    + "&from=2019-09-15&to=2019-09-15&sortBy=popularity"
    + "&apiKey=ef0fa63791284b04bd2c0c06a88e97e4";
    const data = await axios.get(url)
    .then((response) => {
      return response.data; 
    })
    .then ( (rsp) => {
      var work = doStuff(rsp);
      var rspArticle = JSON.stringify(work);
      rspArticle = JSON.parse(rspArticle.replace(/&quot;/g, '"'));
      console.logrspArticle
      if (rspArticle == []) {
        throw "Not enough headlines"
        + "choose different parameters";
      }
      else if (rspArticle.length != 0 ) {
        res.render('newsapi', {articles: rspArticle});
      }
      else {
        res.render('error', {error: "Error occured, research"});
    }
  });
  }
  catch (error){
    res.render('error', {error});
  }
});

module.exports = router;
