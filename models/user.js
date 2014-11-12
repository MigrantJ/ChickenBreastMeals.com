'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var moment = require('moment');

var userSchema = mongoose.Schema({
  basic: {
    email: String,
    password: String
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.createToken = function(app) {
//pass in the app because it needs to read an app secret that is application wide
  var expores = moment.add('days',7).valueOf();
  var self = this;
  var token = jwt.encode({
    iss: self._id, //iss means "id"
    expires: expires
  }, app.get('jwtTokenSecert'));
  return token;
};

module.exports = mongoose.model('User', userSchema);