var db = require('mongojs').connect('mongodb://nodejitsu:650bf5167af0d134783db7f5ffd532be@linus.mongohq.com:10090/nodejitsudb6507186139', ['users']);



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