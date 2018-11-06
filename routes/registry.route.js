const express = require('express');
const router = express.Router();

const registry = require('../controllers/registry.controller');

router
   .get('/patients', registry.allPatients)
   .post('/patients', registry.newPatient);
router
   .get('/patients/:id', registry.getPatient)
   .post('/patients/:id', registry.updatePatient);

module.exports = router;