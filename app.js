
/**
 * Module dependencies.
 */

var express  = require('express')
  , staticp  = require('./routes/staticpage')
  , register = require('./routes/register')
  , session  = require('./routes/session')
  , admin    = require('./routes/admin')
  , helper   = require('./helpers/helper')
  , http     = require('http')
  , path     = require('path');

var app = express();


app.use(express.cookieParser());
app.use(function(req, res, next) {
  helper.isLoggedIn(req, res, next);
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public'));
app.use("/public", express.static(__dirname + '/public'));

app.configure('development', function() {
	app.use(express.errorHandler());
	app.locals.pretty = true;
});

app.configure('production', function() {
	app.use(express.errorHandler());
	app.locals.pretty = true;
});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// BEGIN ROUTES
var isAdmin = function(req, res, next) {
  console.log('Triggered isAdmin');
  helper.isAdmin(req, res, next);
}

// Home Page
app.get('/', staticp.home);
app.get('/index.html', staticp.home);
//Registration Page
app.get('/register.html', register.show);
app.post('/register.html', register.new);
//Login Page
app.post('/session.html', session.new);
app.get('/session.html', session.destroy);

// About Page
app.get('/about.html', staticp.about);

// Admin Page
app.get('/admin.html', admin.show);
app.post('/admin.html', admin.new);
app.get('/adminload.html', admin.load);
app.get('/admin.html/:id', function(req, res) { admin.fetch(req, res, req.params.id); });
app.put('/admin.html', admin.update);
app.delete('/admin.html/:id', function(req, res) { admin.delete(req, res, req.params.id); });


// Test

// END ROUTES

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});