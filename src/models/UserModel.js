const mongoose = require('mongoose')

const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    username: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    noms: { type: String },
    prenoms: { type: String },
    telephone: { type: String},
    qualification: { type: String},
    region_sanitaire: { type: String},
    arrondissement: { type: String},
    quartier: { type: String }
}))