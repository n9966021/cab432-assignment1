var express = require('express');
var router = express.Router();
var axios = require('axios');
var NewsAPI = require('newsapi');
var newsapi = new NewsAPI(process.env.NEWS_KEY);

router.use(logger('tiny'));



  router.get('/newsapi/', function(req, res, next) {
    res.render('newsapi', {headlineMatter: req.params.subject});
  });

  router.post('newsapi/subject/', function (req, res, next) {
    var subject = req.param.subject;
    res.redirect(`/newsapi/subect`);
  })
