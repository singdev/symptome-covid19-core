const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');

module.exports = {

    async createUser(req, res, next) {
        console.log(req.body.password);
        const hash = await bcrypt.hash(req.body.password, 10);
        console.log("Après le hash " + hash);
        if(hash != null){
            req.body.password = hash;
            const user = new User(req.body);
            try {
                console.log(req.body);
                console.log("Before save");
                const newUser = await user.save();
                console.log("After save");
                res.send(newUser);        
            } catch(err){
                res.send(500);
            }
        } else {
            res.sendStatus(500);
        }
    },

    async updateUser(req, res, next){
        req.body.password = undefined;
        const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
        if(user){
            res.send(user);
        } else {
            res.send(501);
        }
    },

    async getUser(req, res, next) {
        const users = await User.find({ _id: req.params.id});
        if(users){
            res.send(users);
        } else {
            res.send(500);
        }
    }
}