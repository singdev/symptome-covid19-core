var express = require('express');
var router = express.Router();
var userController = require('../src/controller/userController');
var authController = require('../src/controller/authenticationController');

/* GET users listing. */
router.get('/:id', authController.verifyAccessToken, userController.getUser);

router.post('/', authController.verifyAccessTokenForRoot, userController.createUser);

router.put('/:id', authController.verifyAccessToken, userController.updateUser);

router.post('/auth', authController.authenticate);

router.get('/auth/logout', (req, res, next) => {
    res.clearCookie('auth');
    res.render('login');
})

router.post('/auth/root', authController.rootAuthentication);

module.exports = router;
