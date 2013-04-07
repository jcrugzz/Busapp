var db     = require('mongojs').connect('mongodb://nodejitsu:b4c3999e31705e9fb8889b3c2411f902@linus.mongohq.com:10034/nodejitsudb7971439175', ['users']),
    crypto = require('crypto');

exports.new = function(req, res) {
	
	function User(email, password) {
		this.email = email;
		this.password = password;
	}
	var digestPassword = crypto.createHash('sha256').update(req.body.user.password).digest("hex");
	var user = new User(req.body.user.email, digestPassword);	

	db.users.find({'email':user.email}, function(err, userFound) {
		console.log(userFound);
		if (userFound.length === 0) {
			console.log('We could not find the user.');
		} else if (err) {
			console.log('We have an error: ' + err);
		} else if (digestPassword !== userFound[0].password) {
			console.log('Incorrect password.');
		} else {
			console.log('We found the user, AND the passwords match.\n' + 
						'UserFound: ' + userFound[0].email + '\n' +
						'UserFound Password: ' + userFound[0].password + '\n' +
						'User Submitted: ' + user.email + '\n' + 
						'User Submitted Password: ' + user.password);
		}
	});

}