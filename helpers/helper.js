var db = require('mongojs').connect('localhost/busapp', ['users']);



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
  db.users.find({'rememberToken': req.cookies.rememberToken}, function(err, foundUser) {
    if (err) { console.log('We have an error' + err) } else {

      if (foundUser.length === 0) {
        console.log('We could not find the user.');
        console.log('Somebody attempted to view the Admin page without an account.')
        res.render('index', { 'title': 'Home Page'})

      } else {
        if (foundUser[0].admin === 1) {
          console.log('Admin logged into the Admin Page.')
          res.render('admin', { 'title': 'Admin Page' });
        } else {
          console.log('A non-admin user account tried to log into the Admin page: ' + foundUser[0].email);
          res.render('index', { 'title': 'Home Page' });
        }
      }


    }
  })
}