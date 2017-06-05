const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const UserSerializer = require('./serializer');

const Controller = {     
    async login(req, res) {
        try{
            const {username, password} = req.body;
            const user = await UserModel.findOne({'username': username});
            const isValid = await user.authenticate(password);
            if (isValid) {
                res.status(201).json({
                    user: UserSerializer.for('login', user),
                    accessToken: user.genToken()
                });
            }else{
                res.status(401).json({
                    user: {
                        errors: 'Invalid credentials'
                    }
                });
            }         
        }catch(err){
            res.status(500).json({status: 500, message: err.message || err});
        }
    }
}

module.exports = Controller;