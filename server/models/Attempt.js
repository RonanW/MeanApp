var mongoose = require('mongoose');

module.exports = mongoose.model('Attempt', {
  username: String,
  datetime: String,
  IP: String,
  attemptAction: String
});