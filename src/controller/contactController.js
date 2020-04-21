const Contact = require('../models/ContactModel');

module.exports = {

    createContact(req, res, next) {
        const contact = new Contact(req.body);
        try {
            const newContact = await contact.save();
            res.send(newContact);
        } catch (err) {
            res.send(500);
        }
    },

    getAllContact(req, res, next) {
        const conctats = await Contact.find({});
        res.send(conctats);
    },

    updateContact(req, res, next) {
        if(!req.params.id){
            res.sendStatus(403);
            return;
        }
        const contact = await Contact.findOneAndUpdate({ _id: id }, req.body);

        res.send(contact);
    }


}