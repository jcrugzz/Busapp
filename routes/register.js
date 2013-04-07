// GET Registration Page
exports.show = function(req, res){
  res.render('register', { title: 'Register' });
};

// POST Register new user
exports.new = function(req, res) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

	var db = require('mongojs').connect('mongodb://nodejitsu:b4c3999e31705e9fb8889b3c2411f902@linus.mongohq.com:10034/nodejitsudb7971439175', ['users']);
	var crypto = require('crypto');
	db.users.ensureIndex({email:1}, {unique: true});
	db.users.ensureIndex({username:1}, {unique: true});

	function User(email, username, password) {
		this.email = email;
		this.username  = username;
		this.password = password;
		this.dateCreated = new Date();
		this.dateModified = new Date();
		this.admin = 0;
		this.activated = 0
	}

	if (req.body.user.username === '' || req.body.user.email === '' || req.body.user.password === '' || req.body.user.passwordc === '') {
		res.json({ error: 'One or more fields are blank :(.'});
	} else if (req.body.user.username.length <= 6 || req.body.user.email.length <= 4 || req.body.user.password.length <= 6 || req.body.user.passwordc.length <= 6) {
		res.json({ error: 'Fields must be the appropriate length :(.'});
	} else if (req.body.user.password !== req.body.user.passwordc) {
		res.json({ error: 'Passwords do not match'});
	} else if (!re.test(req.body.user.email)) {
		res.json({error: 'Not a valid email address.'});
	} else {
		var digestPassword = crypto.createHash('sha256').update(req.body.user.password).digest("hex");
		var user = new User(req.body.user.email, req.body.user.username,
							digestPassword);
		console.log(user.email + digestPassword + user.username);
 		// Save user to database
		db.users.save(user, function(err, savedUser) {
			console.log(typeof err + "\n\n\n\n\n\n\n");
			if (err) {
				if(typeof err.err === 'undefined') {
					res.json({ error: 'Unable to connect to the database :(. ' });
				} else if (typeof err === 'object' && err.err.indexOf('dup')) {
					res.json({ error: 'Email and/or Username already registered.' });
				}
			} else {
				res.json({ success: 'Account registered successfully :).' });
			}
			
		});
    }	
}
