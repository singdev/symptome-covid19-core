var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.cookies.auth){
        console.log("Cookies");
        console.log(req.cookies.auth);
        res.render('index', { title: 'Centre Opérationnel de Riposte au Epidémies' });
    } else {
        res.render('login');
    }
});

module.exports = router;
