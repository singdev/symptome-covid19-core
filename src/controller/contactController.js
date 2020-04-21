const Contact = require('../models/ContactModel');

module.exports = {

    async createContact(req, res, next) {
        const contact = new Contact(req.body);
        try {
            const newContact = await contact.save();
            let contacts = await Contact.find({});
            contacts = contacts.sort((a, b) => {
                const fullname1 = a.noms + ' ' + a.prenoms;
                const fullname2 = b.noms + ' ' + b.prenoms;
                return fullname1.localeCompare(fullname2);
            })
            res.redirect('/');
            res.render('index', { title: "Centre Opérationnel de Riposte aux Epidémies", contacts});
        } catch (err) {
            res.send(500);
        }
    },

    async getAllContact(req, res, next) {
        const conctats = await Contact.find({});
        res.send(conctats);
    },

    async updateContact(req, res, next) {
        if(!req.params.id){
            res.sendStatus(403);
            return;
        }
        const id = req.params.id
        const contact = await Contact.findOneAndUpdate({ _id: id }, req.body);
        let contacts = await Contact.find({});
        contacts = contacts.sort((a, b) => {
            const fullname1 = a.noms + ' ' + a.prenoms;
            const fullname2 = b.noms + ' ' + b.prenoms;
            return fullname1.localeCompare(fullname2);
        })
        res.redirect('/');
        res.render('index', { title: "Centre Opérationnel de Riposte aux Epidémies", contacts});
    }
}