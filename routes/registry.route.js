const express = require('express');
const router = express.Router();

const registry = require('../controllers/registry.controller');

router
   .get('/users', registry.allUsers)
   .post('/users', registry.newUser);
router
   .get('/users/:id', registry.getUser)
   .post('/users/:id', registry.updateUser);

module.exports = router;