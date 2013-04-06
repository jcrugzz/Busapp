var db     = require('mongojs').connect('localhost/busapp', ['users']),
    crypto = require('crypto');

exports.new = function(req, res) {
	
	function User(email, password) {
		this.email = email;
		this.password = password;
	}

	var user = new User(req.body.user.email, req.body.user.password);
	console.log(user.email + user.password);

	db.users.find({'email':user.email}, function(err, userFound) {
		
		if (err) {
			console.log('We have an error :(');
		} else if (!userFound) {
			console.log('We couldn\'t find the user ' + user.email);
			return;
		} else {
			console.log('We have fixed the error, hooorraayyy!! ' + userFound[0].email + " " + userFound[0].password)
		} 
	});

}