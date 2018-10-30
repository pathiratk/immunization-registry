const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
   firstName: {type: String, required: true},
   lastName: {type: String, required: true},
   dateOfBirth: {type: Date, required: true},
   gender: {type: String, required: true},// enum
   motherFirstName: {type: String, required: true},
   motherLastName: {type: String, required: true},
   contactInfo: {type: String, required: true},
   pastImmunization : [{
      date: {type: Date, required: true},
      vaccine: {type: String, required: true},
      administeredBy: {type: String, required: true}
   }],
   appointment: {type: Date},
   created_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);