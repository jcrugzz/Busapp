exports.show = function(req, res) {
	res.render('admin', { title: 'Admin Page' });
}


exports.new = function(req, res) {
	var db = require('mongojs').connect('localhost/busapp', ['routes']);

	function Route(route_number, stop_number, latitude, longitude, street_name,
				   weekday_day, weekend_day, ado_day, weekday_night, weekend_night,
				   ado_night) {
		this.route_number  = route_number;
		this.stop_number   = stop_number;
		this.latitude      = latitude;
		this.longitude     = longitude;
		this.street_name   = street_name;
		this.weekday_day   = weekday_day;
		this.weekend_day   = weekend_day;
		this.ado_day       = ado_day;
		this.weekday_night = weekday_night;
		this.weekend_night = weekend_night;
		this.ado_night     = ado_night;
	}
	

	if (req.body.route.route_number  === '' || req.body.route.stop_number    === '' ||
		req.body.route.latitude      === '' || req.body.route.longitude      === '' ||
		req.body.route.street_name   === '' || req.body.route.weekday_day    === '' ||
		req.body.route.weekend_day   === '' || req.body.route.ado_day        === '' ||
		req.body.route.weekday_night === '' || req.body.route.weekend_night  === '' ||
		req.body.route.ado_night     === '') {

		res.json({ 'error': 'One or more fields are blank.'});
	} else {

		var route = new Route(req.body.route.route_number, req.body.route.stop_number,
			req.body.route.latitude, req.body.route.longitude, req.body.route.street_name,
			req.body.route.weekday_day, req.body.route.weekend_day, req.body.route.ado_day,
			req.body.route.weekday_night, req.body.route.weekend_night, req.body.route.ado_night);

		db.routes.save(route, function(err, savedRoute) {
			if (err) {
				console.log(route);
				console.log('Fail safe.');
				res.json({'error': 'We have an errror: ' + err });
			} else {
				for (i in savedRoute) {
					console.log(i + ': ' + savedRoute[i]);
					res.json({'success': 'Marker saved successfully.'});
				}
			}
		});

	}

}

exports.load = function(req, res) {
	var db = require('mongojs').connect('localhost/busapp', ['routes']);

	
}