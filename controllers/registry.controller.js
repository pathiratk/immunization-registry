const User = require('../models/user.model');
const Schedule = require('../models/schedule.model');

exports.allUsers = function (req, res) {
   User.find({}, function(err, users) {
      if (err) {
         res.send(err);
         return;
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

   newUser.save(function(err, user) {
      if (err) {
         res.send(err);
         return;
      }
      res.json(user)
   })
}

exports.getUser = function (req, res) {
   User.findById(req.params.id, function(err, user) {
      if (err) {
         res.send(err);
         return;
      }
      res.json(user);
   })
   // res.send("get user");
}

exports.updateUser = function (req, res) {
   var date = new Date(req.body.date);
   User.update(
      {'_id': req.params.id}, 
      { $set: {'immunization.$[elem].administered': true}}, 
      { "arrayFilters": [{"elem.date": date}], "multi": true},
      function(err, users) {
      if (err) {
         res.send(err);
         return;
      }
      User.findById(req.params.id, function(err, user) {
         if (err) {
            res.send(err);
            return;
         }
         var appointment = user.immunization.sort(function(a, b) {
            return a['date'] - b['date'];
         }).filter(function (item) {
            return !item['administered']
         });

         if (appointment.length == 0) {
            console.log("no more appointment");
            appointment = null;
         } else {
            appointment = appointment[0]['date'];
         }

         console.log(appointment);
         User.findByIdAndUpdate(req.params.id, {$set: {'appointment': appointment}}, function(err, user) {
            if (err) {
               res.send(err);
               return;
            }
            res.json(users);
         })
      })
   })
}