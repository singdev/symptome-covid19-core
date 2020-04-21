const request = require('request');
const PDFDocument = require('pdfkit');

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
    async template(doc) {

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
            const img = await this.requestImageSync('http://localhost:3000/images/drapeau_du_gabon.png');
            doc.image(img, 500, 20, { width: 80 });
        } catch (error) {
            console.log(error);
        }

        doc.moveTo(nextX, nextY);
        doc.moveDown(2);
        doc.text("Fiche de suivi journalier des contacts de Covid-19", { width: 600, align: 'center' })

        doc.moveDown(2);
        nextX = doc.x + 50;
        nextY = doc.y;
        doc.text("Agent de suivi", nextX, nextY, { width: 250, align: 'center', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 250, 20).stroke();

        nextX = nextX + 250;
        doc.text("Contact", nextX, nextY, { width: 250, align: 'center', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 250, 20).stroke();

        //Agent de suivi
        //Noms
        nextX = doc.x - 250;
        nextY = doc.y;
        doc.text("Noms", nextX, nextY, { width: 100, align: 'left', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 100, 20).stroke();
        nextX = nextX + 100;
        doc.text("Nve Orphée", nextX, nextY, { width: 150, align: 'left', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 150, 20).stroke();

        //Prenoms
        nextX = doc.x - 100;
        nextY = doc.y;
        doc.text("Noms", nextX, nextY, { width: 100, align: 'left', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 100, 20).stroke();
        nextX = nextX + 100;
        doc.text("Nve Orphée", nextX, nextY, { width: 150, align: 'left', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 150, 20).stroke();

        //Téléphone
        nextX = doc.x - 100;
        nextY = doc.y;
        doc.text("Téléphone", nextX, nextY, { width: 100, align: 'left', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 100, 20).stroke();
        nextX = nextX + 100;
        doc.text("Qualification", nextX, nextY, { width: 150, align: 'left', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 150, 20).stroke();

        //Qualification
        nextX = doc.x - 100;
        nextY = doc.y;
        doc.text("Qualification", nextX, nextY, { width: 100, align: 'left', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 100, 20).stroke();
        nextX = nextX + 100;
        doc.text("Nve Orphée", nextX, nextY, { width: 150, align: 'left', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 150, 20).stroke();

        //Région sanitaire
        nextX = doc.x - 100;
        nextY = doc.y;
        doc.text("Région sanitaire", nextX, nextY, { width: 100, align: 'left', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 100, 20).stroke();
        nextX = nextX + 100;
        doc.text("Nve Orphée", nextX, nextY, { width: 150, align: 'left', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 150, 20).stroke();

        //Département sanitaire/arrondissement
        nextX = doc.x - 100;
        nextY = doc.y;
        doc.text("Département sanitaire/arrondissement", nextX, nextY, { width: 100, align: 'left', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 100, 20).stroke();
        nextX = nextX + 100;
        doc.text("Nve Orphée", nextX, nextY, { width: 150, align: 'left', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 150, 20).stroke();

        //Prenoms
        nextX = doc.x - 100;
        nextY = doc.y;
        doc.text("Quartier/village", nextX, nextY, { width: 100, align: 'left', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 100, 20).stroke();
        nextX = nextX + 100;
        doc.text("Nve Orphée", nextX, nextY, { width: 150, align: 'left', paragraphGap: 5, indent: 5 })
        doc.rect(nextX, nextY - 5, 150, 20).stroke();

    }
}