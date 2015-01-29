'use strict';

var Attempt = require('../models/Attempt');

module.exports.list = function (req, res) {
  Attempt.find({}, function (err, results) {
    res.json(results);
  });
}