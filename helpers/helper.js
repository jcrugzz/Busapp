var db = require('mongojs').connect('localhost/busapp', ['users']);



// CHECK IF USER IS LOGGED IN ::::

exports.isLoggedIn = function(req, res, next) {

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
}