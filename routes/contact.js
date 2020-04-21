var express = require('express');
var router = express.Router();

var contactController = require('../src/controller/contactController');
var authController = require('../src/controller/authenticationController');

router.post('/', authController.verifyAccessToken, contactController.createContact);

router.get('/', authController.verifyAccessToken, contactController.getAllContact);

router.put('/:id', authController.verifyAccessToken, contactController.updateContact);

module.exports = router;