const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const queries = require('../db/queries.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  return next();
});

router.use(cookieParser());

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Welcome to Express!';
  res.send(renderObject);
});

router.get('/test', function (req, res, next) {
  console.log('stuff');
  queries.getUser('users', 'bippetyboppetyboo@gmail.com', function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.post('/authenticate', function (req, res, next) {
  let emailAddress = req.body.email;
  let submittedPassword = req.body.password;
  queries.getUser('users', emailAddress, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      let hash = result[0].password;
      bcrypt.compare(submittedPassword, hash, function(err, response) {
        if (response) {
          result[0].password = null;
          res.send('It works!');
        } else {
          res.send('It doesn\'t work!');
        }
      });
    }
  });
});

router.post('/newUser', function (req, res, next) {
  let newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.email,
    password: req.body.password
  };
  bcrypt.hash(newUser.password, 11, function (err, hash) {
    newUser.password = hash;
    queries.addUser(newUser, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send('The thing is done!');
      }
    });
  });
});

module.exports = router;
