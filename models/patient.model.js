const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection(process.env.MONGODB_URI);
autoIncrement.initialize(connection);

let PatientSchema = new Schema({
   firstName: {type: String, required: true},
   lastName: {type: String, required: true},
   dateOfBirth: {type: Date, required: true},
   gender: {type: String, required: true},// enum
   motherFirstName: {type: String, required: true},
   motherLastName: {type: String, required: true},
   contactInfo: {type: String, required: true},
   immunization: [{
      date: {type: Date, required: true},
      vaccine: {type: String, required: true},
      administered: {type: Boolean, default: false},
      clinicID: {type: Number, default: 1}
   }],
   appointment: {type: Date},
   createdDate: {type: Date, default: Date.now}
});

PatientSchema.plugin(autoIncrement.plugin, 'Patient');
module.exports = mongoose.model('Patient', PatientSchema);