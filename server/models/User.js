var mongoose = require('mongoose'),
      crypto = require('crypto'),
      Schema = mongoose.Schema;
   
/**
 * User Schema
 */
var UserSchema = new Schema({
  
    username: {
       type: String,
       unique: true,
       required: 'Username is required',
       trim: true
    },
    password: {
       type: String,
       validate: [
           function(password) {
               return password && password.length > 6;
            }, 'Password should be longer'
        ]
    }, 
    salt: {
        type: String
    },
    permissions: Number,
    created: {
        type: Date,
            default: Date.now
    }
});

/**
 * Hook a pre save method to hash the password
 */
    UserSchema.pre('save', function(next) {
      if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
      }

      next(); 
    });

    /**
     * Create instance method for hashing a password
     */
    UserSchema.methods.hashPassword = function(password) {
      if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
      } else {
        return password;
      }
    };

    UserSchema.methods.authenticate = function(password) {
      return this.password === this.hashPassword(password);
    };

    UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
     var _this = this;
     var possibleUsername = username + (suffix || '');
    
     _this.findOne({
       username: possibleUsername
     }, function(err, user) {
       if (!err) {
         if (!user) {
           callback(possibleUsername);
         } else {
           return _this.findUniqueUsername(username, (suffix || 0) +
             1, callback);
         }
       } else {
         callback(null);
        } 
    });
};

mongoose.model('User', UserSchema);
