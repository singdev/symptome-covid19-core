const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const Memory = require('../database/Memory');
const User = require('../models/UserModel');
const Contact = require('../models/ContactModel');



const JWT_SECRET = "12345678910COVID19";

module.exports = {
    async rootAuthentication(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;

        console.log(username + " " + password);

        if (username == Memory.root.username &&
            password == Memory.root.passowrd) {
            const accessToken = await jwt.sign({ user: Memory.root }, JWT_SECRET);
            res.send(accessToken);
        } else {
            res.sendStatus(403);
        }
    },

    async authenticate(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({ username: username });
        if (user) {
            const compare = await bcrypt.compare(password, user.password);
            if (compare) {
                const accessToken = await jwt.sign({ uid: user._id }, JWT_SECRET);
                res.cookie("auth", accessToken);
                let contacts = await Contact.find({});
                contacts = contacts.sort((a, b) => {
                    const fullname1 = a.noms + ' ' + a.prenoms;
                    const fullname2 = b.noms + ' ' + b.prenoms;
                    return fullname1.localeCompare(fullname2);
                })
                res.redirect('/');
                res.render('index', { title: 'Centre Opérationnel de Riposte au Epidémies', contacts });
            } else {
                res.status(403)
                let contacts = await Contact.find({});
                contacts = contacts.sort((a, b) => {
                    const fullname1 = a.noms + ' ' + a.prenoms;
                    const fullname2 = b.noms + ' ' + b.prenoms;
                    return fullname1.localeCompare(fullname2);
                })
                res.redirect('/');
                res.render('index', { title: 'Centre Opérationnel de Riposte au Epidémies', contacts });
            }
        } else {
            res.sendStatus(403);
        }
    },

    async verifyAccessToken(request, response, next) {

        const accessToken = request.cookies.auth;
        try {
            console.log(accessToken);
            const decoded = await jwt.verify(accessToken, JWT_SECRET)

            request.auth = {
                credentials: decoded.uid,
                artifact: { accessToken }
            }
            next()
        } catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    }
}