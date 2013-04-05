// GET Registration Page
exports.show = function(req, res){
  res.render('register', { title: 'Register' });
};

// POST Register new user
exports.new = function(req, res) {
	var db = require('mongojs').connect('localhost/busapp', ['users']);
	var crypto = require('crypto');
	db.users.ensureIndex({email:1}, {unique: true});
	db.users.ensureIndex({username:1}, {unique: true});

	function User(email, username, password) {
		this.email = email;
		this.username  = username;
		this.password = password;
		this.dateCreated = new Date();
		this.admin = 0;
		this.activated = 0
	}

	if (req.body.user.password !== req.body.user.passwordc) {
		res.send('Passwords do not match');
	} else {
		var digestPassword = crypto.createHash('sha256').update(req.body.user.password).digest("hex");
		var user = new User(req.body.user.email, req.body.user.username,
							digestPassword);
 		// Save user to database
		db.users.save(user, function(err, savedUser) {
			if (err) {
				res.send("Somehow you managed to bypass the jQuery validation ---------->" + err);
			} else {
				res.json({ success: 'Account registered successfully!'});
			}
		});
    }
}
