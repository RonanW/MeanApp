'use strict';

/**
 * Dependencies.
 */

var _       = require('lodash'),
  mongoose  = require('mongoose'),
  passport  = require('passport'),
  Attempt   = require('../models/Attempt');

  require('../passport.js')(passport);


/**
 * Signin after passport authentication
 */
module.exports.signin = function(req, res, next) {

  var attempt = new Attempt();

  attempt.username      = req.body.username;
  attempt.datetime      = Math.round(+new Date()/1000);;
  attempt.IP            = req.headers['x-forwarded-for'] || 
                          req.connection.remoteAddress || 
                          req.socket.remoteAddress ||
                          req.connection.socket.remoteAddress ||
                          req.headers.origin;
  attempt.attemptAction = 'AUTH_FAILURE';

  passport.authenticate('local', function(err, user, info) {
    if (err || !user) {
      res.status(400).send(info);
    } else {
      // Remove sensitive data before login
      user.password = undefined;
      user.salt = undefined;

      req.login(user, function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          attempt.attemptAction = 'AUTH_SUCCESS';
          res.json(user);
        }
      });
    }
    attempt.save();
  })(req, res, next);
};

/**
 * Signout
 */
module.exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};
