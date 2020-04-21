var express = require('express');
var router = express.Router();

const ficheController = require('../src/controller/pdfController');
const authController = require('../src/controller/authenticationController');

router.get('/:contactId', authController.verifyAccessToken, ficheController.downloadPdf);

module.exports = router;