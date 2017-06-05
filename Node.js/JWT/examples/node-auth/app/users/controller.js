const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const UserSerializer = require('./serializer');

const UserController = {
    async getAll(req, res) {
        try{
            const users = await UserModel.find();
            res.json({users: UserSerializer.for('getAll', users)});
        }catch(err){
            res.status(500).json({status: 500, message: err.message || err});
        }
        
    },
    async get(req, res) {
        try{
            const user = await UserModel.findById(req.params.id)
            res.json({user: UserSerializer.for('get', user)});
        }catch(err){
            res.status(500).json({status: 500, message: err.message || err});
        }
    }, 
    async create(req, res) {
        try{
            const {username, password, isAdmin = false} = req.body;
            const newUser = new UserModel({username, password, isAdmin});
            const user = await newUser.save();
            res.status(201).json({
                user: UserSerializer.for('create', user),
                accessToken: user.genToken()
            });
        }catch(err){
            res.status(500).json({status: 500, message: err.message || err});
        }
    }, 
    async update(req, res) {
        try{            
            const {username, password} = req.body;
            const user = await UserModel.findById(req.params.id);
            if(!user) {
                 res.status(404).json({status: 404, message: 'user not found'});
            }else{
                user.username = username;
                user.password = password;
                const updatedUser = await user.save();
                res.json({user: UserSerializer.for('update', updatedUser)});
            }            
        }catch(err){
            res.status(500).json({status: 500, message: err.message || err});
        }
    },
    async destroy(req, res) {
        try{            
            await UserModel.findByIdAndRemove(req.params.id)
            res.status(204).end();
        }catch(err){
            res.status(500).json({status: 500, message: err.message || err});
        }
    }
}

module.exports = UserController;