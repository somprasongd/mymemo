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
    admin: {
        type: Boolean,
        default: false
    }
});

// Step 2: create model
mongoose.model('User', UserSchema);