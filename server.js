'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var passport = require('passport');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/meals-development');
app.use(express.static(__dirname + '/build'));

app.set('jwtTokenSecret', process.env.JWT_SECRET || 'cbmsecret');
app.set('secret', process.env.SECRET || 'cbmsecret');
app.use(passport.initialize());

require('./lib/passport')(passport);
var jwtauth = require('./lib/jwtauth')(app);

app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));

require('./routes/user-routes')(app, passport);
require('./routes/admin-routes')(app, jwtauth.auth);

var server = http.createServer(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
