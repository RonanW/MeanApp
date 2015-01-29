var express           = require('./server/node_modules/express'),
    app               = express(),
    bodyParser        = require('./server/node_modules/body-parser'),
    mongoose          = require('./server/node_modules/mongoose'),
    passport          = require('./server/node_modules/passport'),
    methodOverride    = require('./server/node_modules/method-override');

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// Add passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/skytest');

// Load the models.
app.models = require('./server/models');

app.use(express.static(__dirname + '/client/app'));

// Add this so the browser can GET the bower files
app.use('/bower_components', express.static(__dirname + '/client/bower_components'));

var authController    = require('./server/controllers/AuthenticationController');
var attemptController = require('./server/controllers/AttemptsController');

// REST API
app.post('/auth/login', authController.signin);
app.post('/auth/logout', authController.signout);
app.get('/auth/attempts', attemptController.list);

// SET PORT
app.set('port', 9000);

// LISTEN
app.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});