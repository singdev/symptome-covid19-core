const PDFDocument = require('pdfkit');
const PDF = require('../models/PDF');

const Contact = require('../models/ContactModel');
const User = require('../models/UserModel');

module.exports = {

    async downloadPdf(req, res, next){

        //Télécharger les informations du contact
        const contact = await Contact.findOne({ _id: req.params.contactId});

        //Télécharger les informations de l'utilisateur
        const user = await User.findOne({ _id: req.auth.credentials })
        
        //Télécharger les information sur les symptômes du contact
        //TODO

        const doc = new PDFDocument({ autoFirstPage: false});
        doc.pipe(res);

        doc.addPage({ margin: 20 });
        const fiche = new PDF();
        await fiche.template(doc, contact, user);
        doc.end();
    }
}