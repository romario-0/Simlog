var express = require('express');
var router = express.Router();
const cors = require("cors");

var whitelist = ['http://localhost:3000', 'http://ec2-35-86-242-218.us-west-2.compute.amazonaws.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

/* GET home page. */

router.get('/',cors(corsOptions), function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
