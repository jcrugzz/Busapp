
exports.about = function(req, res) {
	res.render('about', { "title": "About Us" });
}

exports.legal = function(req, res) {
	res.render('legal', { "title": "Legal" });
}

exports.home = function(req, res) {
	res.render('index', { "title": "Home" });
}