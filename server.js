'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

//High security auth
var jwtSecret = 'fjkdlsajfoew239053/3uk';
var user = {
	username: 'cbmadmin',
	password: 'p'
}

var app = express();

app.use(cors());
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/meals-development');
app.use(express.static(__dirname + '/build'));

app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));

require('./routes/admin-routes')(app);

var server = http.createServer(app);

//Server is ready, broadcast to console
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});

//Authentication
//todo: can/should these be refactored out into separate files?
//Check if request contains the right username and password (defined earlier in this file)
function authenticate(req, res, next) {
	var body = req.body;
		if (!body.username || !body.password) {
			res.status(400).end('Must provide username or password');
		} else if (body.username !== user.username || body.password !== user.password) {
			res.status(401).end('Username or password incorrect');
		} else {
			next();
	}
}

app.post('/login', authenticate, function (req, res) {
	var token = jwt.sign({
		username: user.username
	}, jwtSecret);
	res.send({
		token: token,
		user: user
	});
});
