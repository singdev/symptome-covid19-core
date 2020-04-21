const mongoose = require('mongoose')

const Schema = mongoose.Schema;

module.exports = mongoose.model('Contact', new Schema({
    username: { type: String },
    noms: { type: String },
    prenoms: { type: String },
    telephone: { type: String},
    date_naissance: { type: Date },
    region_sanitaire: { type: String},
    arrondissement: { type: String},
    quartier: { type: String },
    state: { type: String, enum: [ "CONF", "DEC", "GUE" ], default: "CONF" }
}))