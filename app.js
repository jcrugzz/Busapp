
/**
 * Module dependencies.
 */

var express  = require('express')
  , staticp  = require('./routes/staticpage')
  , register = require('./routes/register')
  , session  = require('./routes/session')
  , http     = require('http')
  , path     = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.cookieParser());
app.use(express.session({
  secret: "076ee61d63ba104r4e34872411e433b2",
  cookie: {
    httpOnly: true,
    path : '/',
    maxAge: 1000*60*60*24*30*12
  }
}));
app.use(express.csrf());
app.use(function(req, res, next) {
  res.locals.token = req.session._csrf;
  next();
})
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

// Home Page
app.get('/', staticp.home);
app.get('/index.html', staticp.home);
//Registration Page
app.get('/register.html', register.show);
app.post('/register.html', register.new);
//Login Page
app.post('/session.html', session.new);

// About Page
app.get('/about.html', staticp.about);


// Test

// END ROUTES

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
