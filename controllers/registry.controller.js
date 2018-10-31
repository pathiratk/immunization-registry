const User = require('../models/user.model');

exports.allUsers = function (req, res) {
   User.find({}, function(err, users) {
      if (err) {
         res.send(err);
      }
      // console.log(typeof users);
      res.json(users);
   })
}

exports.newUser = function (req, res) {
   var newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,// enum
      motherFirstName: req.body.motherFirstName,
      motherLastName: req.body.motherLastName,
      contactInfo: req.body.contactInfo,
      appointment: req.body.appointment
   });
   newUser.save(function(err, user) {
      if (err)
         res.send(err);
      res.json(user)
   })
}

exports.getUser = function (req, res) {
   User.findById(req.params.id, function(err, user) {
      if (err) {
         res.send(err);
      }
      res.json(user);
   })
   // res.send("get user");
}

exports.updateUser = function (req, res) {
   console.log(req.body);
   var vaccine = {
      "date": Date.now(),
      "vaccine": req.body.vaccine,
      "administeredBy": req.body.administeredBy,
   }
   User.findByIdAndUpdate(req.params.id, {$push: {"pastImmunization": vaccine}}, function(err, user) {
      if (err) {
         res.send(err);
      }
      res.json(user);
   })
}