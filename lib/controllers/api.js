'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    async = require('async'),
    User = mongoose.model('User');
var debug = function(s) { 
    console.log(s);
}
exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

exports.registerUser = function(req,res) {
    var u  = req.body;
    var user = new User();
    user.name = u.name;
    user.surname = u.surname;
    user.dob = u.dob;
    user.city = u.city;
    user.password = u.password;
    user.mail = u.mail;
    debug(user);
    user.save();
}

exports.checkUser = function(req,res) {
    var u = req.body;
    debug('cerco');
    debug(u);
    var user = new User();
    User.findOne(u,function(e,user) {
        if(e) {
                return console.dir(e);
        }
        else {
            debug(user)
            user.password = "";
            user.logged = true;
            res.json(user);
        }
    })
}