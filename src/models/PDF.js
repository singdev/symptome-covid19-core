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

    dateToString(date) {
        return (date.getDate() < 10 ? '0' : '')
            + date.getDate() + "/" +
            (date.getMonth() + 1 < 10 ? '0' : '') +
            (date.getMonth() + 1) +
            "/" + date.getFullYear();
    }

    /**
     * 
     * @param {PDFDocument} doc 
     */
    async template(doc, contact, user, tracking) {

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
        doc.fontSize(8);
        //Premier tableau
        const table = new PdfTable(doc, {
            bottomMargin: 30,
        });

        table
            // add some plugins (here, a 'fit-to-width' for a column)
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
                column: 'description'
            }))
            // set defaults to your columns
            .setColumnsDefaults({
                headerBorder: 'T B',
                align: 'center',
                padding: [5, 5, 5, 5],
                headerPadding: [10, 5, 10, 5],
                headerFontSize: 19,
                border: 'L B R',

            })
            // add table columns
            .addColumns([
                {
                    id: 'agent',
                    header: 'Agent de suivi',
                    align: 'left',
                    width: 150,
                },
                {
                    id: 'agent_value',
                    header: '',
                    align: 'left',
                    width: 150
                },
                {
                    id: 'contact',
                    header: 'Contact',
                    width: 120,
                    align: 'left',
                    renderer: function (tb, data, draw, column, pos) {
                        if (draw) { // at first call: false. Then it's true
                            if (!data.barcode) {
                                return 'No barcode (' + data.id + ')';
                            }
                            tb.pdf.fontSize(18);;
                        }
                        return data.contact; // you need to return a string
                    }
                },
                {
                    id: 'contact_value',
                    header: '',
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
            { agent: 'Noms', agent_value: user.noms, contact: "Noms", contact_value: contact.noms },
            { agent: 'Prénoms', agent_value: user.prenoms, contact: "Prénoms", contact_value: contact.prenoms },
            { agent: 'Téléphone', agent_value: user.telephone, contact: "Téléphone 1 et 2", contact_value: contact.telephone },
            { agent: 'Qualification', agent_value: user.qualification, contact: "Date de Naissance", contact_value: contact.date_naissance },
            { agent: 'Région sanitaire', agent_value: user.region_sanitaire, contact: "Région sanitaire", contact_value: contact.region_sanitaire },
            { agent: 'Départements sanitaire/arrondissement', agent_value: user.arrondissement, contact: "Département sanitaire/arrondissement", contact_value: contact.arrondissement },
            { agent: 'Quartier/village', agent_value: user.quartier, contact: "Quartier/village", contact_value: contact.quartier },
        ]);


        doc.x = 120;
        doc.moveDown(4);
        const dernierContact = new Date();
        const premierJourSuivi = new Date(tracking.firstDate);
        const tmp = new Date();
        tmp.setDate(premierJourSuivi.getDate() + 14);
        const dernierJourSuivi =  tmp;
        doc.text("Date du dernier contact avec le cas: " + this.dateToString(dernierContact));
        doc.moveDown(0.5);
        doc.text("Date du premier jour de suivi: " + this.dateToString(premierJourSuivi) );
        doc.moveDown(0.5);
        doc.text("Date du dernier jour de suivi: " + this.dateToString(dernierJourSuivi) );
        doc.moveDown(1);
        doc.x = 20;
        const tableSymptom = new PdfTable(doc, {
            bottomMargin: 30,
        });
        tableSymptom
            // add some plugins (here, a 'fit-to-width' for a column)
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
            }))
            // set defaults to your columns
            .setColumnsDefaults({
                headerBorder: 'T B L R',
                align: 'center',
                padding: [5, 5, 5, 5],
                headerPadding: [5, 5, 5, 5],
                border: 'L B R',

            })
            // add table columns
            .addColumns([
                {
                    id: 'symptom',
                    header: '',
                    width: 80,
                    headerBorder: 'B'
                },
                {
                    id: '1',
                    header: '1',
                    width: 35
                },
                {
                    id: '2',
                    header: '2',
                    width: 35
                },
                {
                    id: '3',
                    header: '3',
                    width: 35
                },
                {
                    id: '4',
                    header: '4',
                    width: 35
                },
                {
                    id: '5',
                    header: '5',
                    width: 35
                },
                {
                    id: '6',
                    header: '6',
                    width: 35
                },
                {
                    id: '7',
                    header: '7',
                    width: 35
                },
                {
                    id: '8',
                    header: '8',
                    width: 35
                },
                {
                    id: '9',
                    header: '9',
                    width: 35
                },
                {
                    id: '10',
                    header: '10',
                    width: 35
                },
                {
                    id: '11',
                    header: '11',
                    width: 35
                },
                {
                    id: '12',
                    header: '12',
                    width: 35
                },
                {
                    id: '13',
                    header: '13',
                    width: 35
                },
                {
                    id: '14',
                    header: '14',
                    width: 35
                },
            ])
            // add events (here, we draw headers on each new page)
            .onPageAdded(function (tb) {
                tb.addHeader();
            });

        // draw content, by passing data to the addBody method
        const array = [];
        const symptoms = ["temperature", "toux", "asthenie", "difficulte_respiratoire", "douleurs_musculaire",
            "diarrhe", "cephalees", "maux_de_gorges", "yeux_rouges", "ecoulement_nasal", "autres", "prelevement"];
        const symptomLabel = ["Température", "Toux", "Asthénie", "Difficultés respiratoires", "Douleurs musculaires",
            "Diarrhées", "Céphalées", "Maux de gorges", "Yeux rouges", "Ecoulement nasal", "Autre", "Prélèvement"];

        let count = 0;
        symptoms.forEach(symptom => {
            let data = { symptom: symptomLabel[count] };
            for (let i = 1; i <= 14; i++) {
                data[i + ""] = tracking.days[i - 1][symptom] ? "X" : " ";
            }
            array.push(data);
            count++;
        })
        tableSymptom.addBody(array);
    }
}