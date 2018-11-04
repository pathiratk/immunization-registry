const User = require('../models/user.model');
const Schedule = require('../models/schedule.model');

exports.allUsers = function (req, res) {
   User.find({}, function(err, users) {
      if (err) {
         res.send(err);
      }
      res.json(users);
   })
}

exports.newUser = function (req, res) {
   var schedule = Schedule(req.body.dateOfBirth);
   var nextApp = new Date();
   nextApp.setMonth(nextApp.getMonth() + 2);
   var newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,// enum
      motherFirstName: req.body.motherFirstName,
      motherLastName: req.body.motherLastName,
      contactInfo: req.body.contactInfo,
      immunization: schedule,
      appointment: nextApp
   });
   // return;
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
   var vaccine = {
      "date": Date.now(),
      "vaccine": req.body.vaccine,
      "administeredBy": req.body.administeredBy,
   }
   var ap = req.body.appointment;
   if (ap) {
      User.findByIdAndUpdate(req.params.id, {$push: {"pastImmunization": vaccine}, $set: {"appointment": ap}}, function(err, user) {
         if (err) {
            res.send(err);
         }
         res.json(user);
      })
   } else {
      User.findByIdAndUpdate(req.params.id, {$push: {"pastImmunization": vaccine}}, function(err, user) {
         if (err) {
            res.send(err);
         }
         res.json(user);
      })
   }
}