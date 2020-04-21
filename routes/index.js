var express = require('express');
var router = express.Router();

const Contact = require('../src/models/ContactModel');

router.get('/', async function(req, res, next) {
    if(req.cookies.auth){
        let contacts = await Contact.find({});
        contacts = contacts.sort((a, b) => {
            const fullname1 = a.noms + ' ' + a.prenoms;
            const fullname2 = b.noms + ' ' + b.prenoms;
            return fullname1.localeCompare(fullname2);
        })
        res.render('index', { title: 'Centre Opérationnel de Riposte au Epidémies', contacts });
    } else {
        res.render('login');
    }
});

module.exports = router;
