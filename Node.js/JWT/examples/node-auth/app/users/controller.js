const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const UserSerializer = require('./serializer');

const UserController = {
    async getAll(req, res) {
        const users = await UserModel.find();
        res.send(users);
    }
}

module.exports = UserController;