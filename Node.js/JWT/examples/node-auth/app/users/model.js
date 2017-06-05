const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Step 1: Create schema
var UserSchema = new Schema({    
    username: {// เรียก Schema modifier
        type: String,
        unique: true,
        trim: true,
        required: true // model validator
    },
    password: {
        type: String
//        ,
//        validate: [// custome validate
//            function (password) {
//                return password && password.length >= 8;
//            },
//            "Password must be at least 8 charecters"
//        ]
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// Pre save
UserSchema.pre('save', async function (next) {
    if (this.password) {
        this.password = await this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function (password) {
    return new Promise((resolve, reject) => {
        let saltRound = 10; // คือจำนวนรอบในการทำงานผ่านอัลกอริทึมใน bcrypt 10 = 2 ยกกำลัง 10 รอบ
        bcrypt.hash(password, saltRound, (err, hash) => {
            if(err){
                reject(err);
            }else{
                resolve(hash);
            }            
        });
    });
};

UserSchema.methods.authenticate = function (password) {
    return new Promise((resolve, reject) => {
        const hash = this.password;
        bcrypt.compare(password, hash, (err, isValid) => {
            if(err) {
                reject(err);
            }else{
                resolve(isValid);
            }
        })
    });
};

UserSchema.methods.genToken = function () {
    return jwt.sign({
        sub: this._id,
        username: this.username,
        isAdmin: this.isAdmin
    }, config.secret, { expiresIn: '1h' });
};

// Step 2: create model
mongoose.model('User', UserSchema);