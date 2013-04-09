var db = require('mongojs').connect('mongodb://nodejitsu:650bf5167af0d134783db7f5ffd532be@linus.mongohq.com:10090/nodejitsudb6507186139', ['users']);



// CHECK IF USER IS LOGGED IN ::::

exports.isLoggedIn = function(req, res, next) {
  if (req.cookies.rememberToken) {
  db.users.find({'rememberToken': req.cookies.rememberToken}, function(err, foundUser) {
      
      if (err) { res.locals.isLoggedIn = false; res.locals.isAdmin = false; next(); }
      if (foundUser.length === 0) {
        res.locals.isLoggedIn = false;
        res.locals.isAdmin = false;
        next();
      } else {
        if (foundUser[0].admin === 1) {
          res.locals.isAdmin = true;
        } else {
          res.locals.isAdmin = false;
        }
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

exports.isAdmin = function(req, res, next) {
  console.log('In isAdmin');
  db.users.find({'rememberToken': req.cookies.rememberToken}, function(err, foundUser) {
    if (err) { console.log('We have an error' + err) } else {

      if (foundUser.length === 0) {
        console.log('We could not find the user.');
        console.log('Somebody attempted to view the Admin page without an account.')
        res.render('index', { 'title': 'Home Page'})
        console.log('Made it out of no user found');
      } else {
        if (foundUser[0].admin === 0)
        {
          console.log('A non-admin user account tried to log into the Admin page: ' + foundUser[0].email);
          res.render('index', { 'title': 'Home Page' });
          console.log('Made it out of not admin');
        } else {
          console.log('Admin viewing Admin page.');
          next();
          console.log('Made it out of IS admin.');
        }
      }
    }
  })
}