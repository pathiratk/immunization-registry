const Patient = require('../models/patient.model');
const Schedule = require('../models/schedule.model');

// get the data of all patients
exports.allPatients = function (req, res) {
   Patient.find({}, function(err, patients) {
      if (err) {
         res.send(err);
         return;
      }
      res.json(patients);
   })
}

// create a new patient
exports.newPatient = function (req, res) {
   var schedule = Schedule(req.body.dateOfBirth);
   var newPatient = new Patient({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,// enum
      motherFirstName: req.body.motherFirstName,
      motherLastName: req.body.motherLastName,
      contactInfo: req.body.contactInfo,
      immunization: schedule,
      appointment: req.body.dateOfBirth
   });

   newPatient.save(function(err, patient) {
      if (err) {
         res.send(err);
         return;
      }
      res.json(patient)
   })
}

// get patient data by id
exports.getPatient = function (req, res) {
   Patient.findById(req.params.id, function(err, patient) {
      if (err) {
         res.send(err);
         return;
      }
      res.json(patient);
   })
}

// update patient's immunization data
exports.updatePatient = function (req, res) {
   var date = new Date(req.body.date);
   Patient.update(
      {'_id': req.params.id}, 
      { $set: {'immunization.$[elem].administered': true}}, 
      { "arrayFilters": [{"elem.date": date}], "multi": true},
      function(err, patients) {
      if (err) {
         res.send(err);
         return;
      }
      Patient.findById(req.params.id, function(err, patient) {
         if (err) {
            res.send(err);
            return;
         }
         var appointment = patient.immunization.sort(function(a, b) {
            return a['date'] - b['date'];
         }).filter(function (item) {
            return !item['administered']
         });

         if (appointment.length == 0) {
            appointment = null;
         } else {
            appointment = appointment[0]['date'];
         }

         Patient.findByIdAndUpdate(req.params.id, {$set: {'appointment': appointment}}, function(err, patient) {
            if (err) {
               res.send(err);
               return;
            }
            res.json(patients);
         })
      })
   })
}