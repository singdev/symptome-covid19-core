var express = require('express');
var router = express.Router();

const ficheController = require('../src/controller/pdfController');

router.get('/', ficheController.downloadPdf);

module.exports = router;