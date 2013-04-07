var db = require('mongojs').connect('mongodb://nodejitsu:b4c3999e31705e9fb8889b3c2411f902@linus.mongohq.com:10034/nodejitsudb7971439175', ['users']);



// CHECK IF USER IS LOGGED IN ::::

exports.isLoggedIn = function(req, res, next) {
  if (req.cookies.rememberToken) {
  db.users.find({'rememberToken': req.cookies.rememberToken}, function(err, foundUser) {
      
      if (err) { res.locals.isLoggedIn = false; next(); }
      if (foundUser.length === 0) {
        res.locals.isLoggedIn = false;
        next();
      } else {
        res.locals.isLoggedIn = true;
        res.locals.userName = foundUser[0].username;
        next();
      }
    });
  } else {
    res.locals.isLoggedIn = false;
    next();
  }

}