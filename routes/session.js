var db     = require('mongojs').connect('mongodb://nodejitsu:bf182e585ade8294cf4442939e1667da@linus.mongohq.com:10018/nodejitsudb7293203803', ['users']),
    crypto = require('crypto'),
    bcrypt = require('bcrypt');

exports.new = function(req, res) {
	try {
	
	function User(email) {
		this.email = email;
	}

	var user = new User(req.body.user.email);	


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
				} else if (!bcrypt.compareSync(req.body.user.password, userFound[0].password)) {
					console.log('Incorrect password.');
					res.render('index', { title: 'Test' });
				} else {
					// TO DO: REMOVE THIS LOG AFTER DEBUGGING DONE
					res.cookie('rememberToken', userFound[0].rememberToken, { expires: new Date(Date.now() + 90000000) });
					res.locals.isLoggedIn = true;
					if (userFound[0].admin === 1) {
						res.locals.isAdmin = true;
					} else {
						res.locals.isAdmin = false;
					}
					res.locals.userName = userFound[0].username;
					res.render('index', { title: 'Test' });
				}
			}
		});
	});
} catch (e) {
	res.json({'error':e});
}

}

exports.destroy = function(req, res) {
	res.clearCookie('rememberToken');
	res.locals.isLoggedIn = false;
	res.render('index', { title: 'Test' });
}