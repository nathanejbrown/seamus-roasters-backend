const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const queries = require('../db/queries.js');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Welcome to Express!';
  res.send(renderObject);
});

router.get('/test', function (req, res, next) {
  queries.getUser('users', 'bippetyboppetyboo@gmail.com', function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
