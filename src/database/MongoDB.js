const mongoose = require('mongoose');

module.exports = (dbName) => {
    console.log('Connexion avec mongoDB');
    mongoose.connect('mongodb://127.0.0.1:27018/' + dbName, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })

    mongoose.connection.on('error', (err) => {
        console.log(err);
    })
}