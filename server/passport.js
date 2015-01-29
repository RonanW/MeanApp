
var passport = require('passport'),
    User     = require('mongoose').model('User'),
    path     = require('path');
  
/**
 * Module init function.
 */
module.exports = function() {
  // Serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize sessions
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, '-salt -password', function(err, user) {
      done(err, user);
    });
  });

// Initialize strategies
require('./strategies/local')();

};