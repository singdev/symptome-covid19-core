const PDFDocument = require('pdfkit');
const PDF = require('../models/PDF');

module.exports = {

    async downloadPdf(req, res, next){

        const doc = new PDFDocument({ autoFirstPage: false});
        doc.pipe(res);

        doc.addPage({ margin: 20 });
        const fiche = new PDF();
        await fiche.template(doc);
        doc.end();
    }
}