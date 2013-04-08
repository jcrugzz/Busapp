exports.show = function(req, res) {
	res.render('admin', { title: 'Admin Page' });
}


exports.new = function(req, res) {
	var db = require('mongojs').connect('localhost/busapp', ['routes']);

	function Route(plant_site, route_number, stop_number, latitude, longitude, street_name,
				   weekday_day, weekend_day, ado_day, weekday_night, weekend_night,
				   ado_night) {
		this.plant_site    = plant_site;
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
	

	if (req.body.route.plant_site    === '' ||
		req.body.route.route_number  === '' || req.body.route.stop_number    === '' ||
		req.body.route.latitude      === '' || req.body.route.longitude      === '' ||
		req.body.route.street_name   === '' || req.body.route.weekday_day    === '' ||
		req.body.route.weekend_day   === '' || req.body.route.ado_day        === '' ||
		req.body.route.weekday_night === '' || req.body.route.weekend_night  === '' ||
		req.body.route.ado_night     === '') {

		res.json({ 'error': 'One or more fields are blank.'});
	} else {

		var route = new Route(req.body.route.plant_site, req.body.route.route_number, req.body.route.stop_number,
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

	db.routes.find(function(err, foundMarkers) {
		console.log(foundMarkers);
		res.json({ 'success': foundMarkers });
	});
}

exports.fetch = function(req, res, id) {
	var db = require('mongojs').connect('localhost/busapp', ['routes']);
	console.log(id);
	console.log(id);

	db.routes.find({'latitude': id}, function(err, foundRoute) {
		if (err) {
			res.json({'error': 'Failed to fetch with id: ' + id });
		} else if (foundRoute.length === 0) {
			res.json({'error': 'Failed to fetch with id: ' + id });
		} else {
			res.json({'success': 'Fetched Marker Successfully', 'foundRoute': foundRoute});
		}
	});
}




exports.upadte = function(req, res) {
	var db = require('mongojs').connect('localhost/busapp', ['routes']);
	db.routes.update({'latitude': req.body.route.latitude}, { $set: {
		'plant_site':    req.body.routes.plant_site,
		'route_number':  req.body.routes.route_number,
		'stop_number':   req.body.routes.stop_number,
		'latitude':      req.body.routes.latitude,
		'longitude':     req.body.routes.longitude,
		'street_name':   req.body.routes.street_name,
		'weekday_day':   req.body.routes.weekday_day,
		'weekend_day':   req.body.routes.weekend_day,
		'ado_day':       req.body.routes.ado_day,
		'weekday_night': req.body.routes.weekday_night,
		'weekend_night': req.body.routes.weekend_night,
		'ado_night':     req.body.routes.ado_night
	}
})
}































