var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

// Redis connection
var redis = require('redis');
if (process.env.REDISTOGO_URL) {
  var rtg = require("url").parse(process.env.REDISTOGO_URL);
  var client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
  var client = redis.createClient();
  client.select((process.env.NODE_ENV || 'development').length);
}

var private = require('express-http-auth').realm('User List')

/* GET users listing. */
router.route('/')

  .get(private, function(req, res){

    if (req.username == 'mike' && req.password == 'pass*1234') {

      client.hkeys('users', function(error, user) {
        if (error) throw error;

        res.json(user);
      });

    } else {
      res.sendStatus(103);
    }
  })
  .post(urlencode, function(req, res) {
    var newUser = req.body;

    client.hset('users', newUser.email, new Date(), function(error) {
      if (error) throw error;
      res.sendStatus(201);
    });

  });

module.exports = router;
