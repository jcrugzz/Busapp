var db     = require('mongojs').connect('mongodb://nodejitsu:b4c3999e31705e9fb8889b3c2411f902@linus.mongohq.com:10034/nodejitsudb7971439175', ['users']),
    crypto = require('crypto');

exports.new = function(req, res) {
	
	function User(email, password) {
		this.email = email;
		this.password = password;
	}
	var digestPassword = crypto.createHash('sha256').update(req.body.user.password).digest("hex");
	var user = new User(req.body.user.email, digestPassword);	


		var newToken = crypto.createHash('sha1').update(Math.random() * 5997979 + new Date() + 5*123).digest("hex");
		db.users.update({email: user.email}, { $set: {rememberToken: newToken} }, function(errUpdate) {
			if (errUpdate) { console.log('Fail safe. ' + errUpdate); }

		db.users.find({'email':user.email}, function(errFind, userFound) {

			if (errFind) {
			console.log('Fail safe. ' + errFind);
			} else {

				if (userFound.length === 0) {
					console.log('We could not find the user.');
					res.render('index', { title: 'Test' });
				} else if (errFind) {
					console.log('We have an error: ' + errFind);
					res.render('index', { title: 'Test' });
				} else if (digestPassword !== userFound[0].password) {
					console.log('Incorrect password.');
					res.render('index', { title: 'Test' });
				} else {
					// TO DO: REMOVE THIS LOG AFTER DEBUGGING DONE
					console.log('We found the user, AND the passwords match.\n' + 
								'UserFound: ' + userFound[0].email + '\n' +
								'UserFound Password: ' + userFound[0].password + '\n' +
								'User Submitted: ' + user.email + '\n' + 
								'User Submitted Password: ' + user.password);
					res.cookie('rememberToken', userFound[0].rememberToken, { expires: new Date(Date.now() + 90000000), httpOnly: true});
					res.locals.isLoggedIn = true;
					res.locals.userName = userFound[0].username;
					res.render('index', { title: 'Test' });
				}
			}
		});
	});

}

exports.destroy = function(req, res) {
	res.clearCookie('rememberToken');
	res.locals.isLoggedIn = false;
	res.render('index', { title: 'Test' });
}