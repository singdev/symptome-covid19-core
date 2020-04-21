const request = require('request');
const PDFDocument = require('pdfkit');
const PdfTable = require('voilab-pdf-table');

module.exports = class {

    requestImageSync(url) {
        return new Promise((resolve, reject) => {
            request(url, { encoding: null }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const img = new Buffer.from(body);
                    resolve(img);
                } else {
                    reject('Error on download image ' + error);
                }
            });
        });
    }

    /**
     * 
     * @param {PDFDocument} doc 
     */
    async template(doc, contact, user) {

        let nextY = 0;
        let nextX = 0;

        doc.text("MINISTERE DE LA SANTE", { width: 300, align: 'center' });
        doc.text("---------------------", { width: 300, align: 'center' });
        doc.text("SECRETARIAT GENERAL", { width: 300, align: 'center' });
        doc.text("---------------------", { width: 300, align: 'center' });
        doc.text("DIRECTION GENERALE DE LA SANTE", { width: 300, align: 'center' });
        doc.text("---------------------", { width: 300, align: 'center' });

        doc.text("Centre Opérationnel de Riposte aux Epidémies", { width: 300, align: 'center' });

        nextY = doc.y;
        nextX = doc.x;

        try {
            const img = await this.requestImageSync('http://localhost:3001/images/drapeau_du_gabon.png');
            doc.image(img, 500, 20, { width: 80 });
        } catch (error) {
            console.log(error);
        }

        doc.moveTo(nextX, nextY);
        doc.moveDown(2);
        doc.text("Fiche de suivi journalier des contacts de Covid-19", { width: 600, align: 'center' })

        doc.moveDown(2);
        
        //Premier tableau
        const table = new PdfTable(doc, {
            bottomMargin: 30,
            padding: 10
        });

        table
            // add some plugins (here, a 'fit-to-width' for a column)
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
                column: 'description'
            }))
            // set defaults to your columns
            .setColumnsDefaults({
                headerBorder: 'B',
                align: 'right',
                
            })
            // add table columns
            .addColumns([
                {
                    id: 'agent',
                    header: 'Agent de suivi',
                    align: 'left',
                    border: 'B',
                    width: 150
                    
                },
                {
                    id: 'agent_value',
                    header: '',
                    border: 'B',
                    align: 'left',
                    width: 150
                },
                {
                    id: 'contact',
                    header: 'Contact',
                    width: 100,
                    border: 'B',
                    align: 'left'

                },
                {
                    id: 'contact_value',
                    header: '',
                    border: 'B',
                    width: 150,
                    align: 'left'
                },
            ])
            // add events (here, we draw headers on each new page)
            .onPageAdded(function (tb) {
                tb.addHeader();
            });


        // draw content, by passing data to the addBody method
        table.addBody([
            { agent: 'Noms', agent_value:  user.noms, contact: "Noms", contact_value: contact.noms},
            { agent: 'Prénoms', agent_value:  user.prenoms, contact: "Prénoms", contact_value: contact.prenoms},
            { agent: 'Téléphone', agent_value:  user.telephone, contact: "Téléphone 1 et 2", contact_value: contact.telephone},
            { agent: 'Qualification', agent_value:  user.qualification, contact: "Date de Naissance", contact_value: contact.date_naissance},
            { agent: 'Région sanitaire', agent_value:  user.region_sanitaire, contact: "Région sanitaire", contact_value: contact.region_sanitaire},
            { agent: 'Départements sanitaire/arrondissement', agent_value:  user.arrondissement, contact: "Département sanitaire/arrondissement", contact_value: contact.arrondissement},
            { agent: 'Quartier/village', agent_value:  user.quartier, contact: "Quartier/village", contact_value: contact.quartier},
        ]);

    }
}