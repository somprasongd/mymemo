# ตัวอย่างโปรเจคการทำ Authentication & Authorization #

## ความหมาย ##
- **Authentication** คือ กระบวนตรวจสอบว่าคนๆ นั้นคือใคร และใช่ตามที่เค้ายืนยันมาหรือไม่ เช่น การทำ login ที่ต้องส่ง user กับ password มาให้ จากนั้น server จะต้องทำการตรวจสอบว่า user กับ password ที่ให้มาถูกต้องหรือไม่
- **Authorization** คือ หลังจากการตรวจสอบเราว่าผู้ใช้งานคนนั้นเป็นใคร เมื่อผู้ใช้งานคนนั้นๆ จะเข้ามาใช้งาน resources ต่างๆ จะต้องมีการตรวจสอบสิทธิก่อนว่าสามารถทำได้หรือไม่ เช่น admin อ่านเขียนได้ user อ่านได้อย่างเดียวเป็นต้น

## เริ่มสร้างโปรเจค ##

- สร้างโฟลเดอร์โปรเจคชื่อ "node-auth"
```
# mkdir node-auth
```

- สร้างไฟล์ package.json
```
$ npm init -y
```

- ติดตั้ง packages ที่จะใช้งาน
  - express
  - body-parser
  - mongoose
  - jsonwebtoken
  - bcrypt
```
$ npm i --save express body-parser mongoose jsonwebtoken bcrypt
```

- ติดตั้ง packages ที่จะใช้งานสำหรับตอนพัฒนา
  - nodemon
  - dotenv
```
$ npm i --save-dev nodemon dotenv
```

- สร้างไฟล์ server.js
```javascript
const express = require('express');
const bodyParser = require('body-parser');
//const config = require('./config'); // auto import ./config/index.js
//const routes = require('./app/routes');

const app = express();
const PORT = 3000; // config.port;

// set enviroments
// ให้ body-parser แปลง body message เป็น json
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// setup routes
//routes.setupRoutes(app);

// catch 404 and error handler
app.use(function(req, res, next) {
  res.status(404).send({
	  status: 404,
	  message: `${req.method} ${req.url} Not Found`
  });
});

// ระบุ port ของ web server 
app.listen(PORT, err => {
	if (err) {
		console.log('Start server error:', err.message);
	} else {
		console.log('Server is runnig at http://localhost:' + PORT);
	}
});
```

- แก้ไขไฟล์ package.json
```json
"scripts": {
    "dev": "nodemon server.js"
}
```

- รันโดยใช้คำสั่ง `$ npm run dev`

## สร้างไฟล์ Config และการเชื่อมต่อฐานข้อมูล ##
- ไฟล์ /config/config.js
```javascript
require('dotenv').config(); // ถ้าต้องการใช้ .env

module.exports = {
    port: process.env.PORT || 3000, // ถ้าไม่ระบุใน env ให้ใช้ port 3000 แทน
    mongoUri: process.env.MLAB_DB,
    secretKey: process.env.SECRET_KEY
}
```
- สร้างไฟล์ .env เอาไว้เก็บ Environments Variables ไม่ต้องไปตั้งค่าในเครื่อง แต่ไฟล์นี้ต้องไม่ใส่ไปใน git
```
PORT=8080
MLAB_DB=mongodb://<dbuser>:<dbpassword>@12345.mlab.com:12345/dbname
SECRET_KEY=my_secret_key
```

- สร้างไฟล์ db.js สำหรับการเชื่อมต่อฐานข้อมูล mongoDB
```javascript
const config = require('./config');
const mongoose = require('mongoose');
const fs = require('fs');

// Use native promises
mongoose.Promise = global.Promise;

const setupModels = function (APP_DIR) {
    const features = fs.readdirSync(APP_DIR).filter(
        file => fs.statSync(`${APP_DIR}/${file}`).isDirectory()
    );

    features.forEach(feature => {
        if (fs.existsSync(`${APP_DIR}/${feature}/model.js`)) {
           require(`${APP_DIR}/${feature}/model.js`);
        }
        
    });
}
const db = {
    async connect(APP_DIR) {
        mongoose.set('debug', config.debug);        
        // Catching the events
        mongoose.connection.on('connected', function () {
            console.log('Mongoose connected');
        });
        mongoose.connection.on('error', function (err) {
            console.log('Mongoose connection error: ' + err);
        });
        mongoose.connection.on('disconnected', function () {
            console.log('Mongoose disconnected');
        });
        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                console.log('Mongoose disconnected through app termination');
                process.exit(0);
            });
        });
        // load model
        // ตัวอย่าง require('model.js');
        setupModels(APP_DIR);
        // connect to mongodb
        console.log('Connecting to mongodb via mongoose.');
        mongoose.connect(config.mongoUri);        
    }
};

module.exports = db;
```

- ทำเป็น module config โดยสร้างไฟล์ /config/index.js
```javascript
const config = require('./config');
const db = require('./db');

module.exports = Object.assign({}, config, {db});
```

- เอา comment ที่บรรทัดที่ 3 ในไฟล์ server.js ออก

## สร้าง users service ##
- สร้างไฟล์ /users/model.js ไว้เป็นโมเดลของ user
```javascript
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
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// Step 2: create model
mongoose.model('User', UserSchema);
```

- สร้างไฟล์ /users/routes.js เพื่อกำหนดเส้นทางการจัดการ request ที่เรียกเข้ามาว่าจะส่งไปหา controller ตัวไหน
```javascript
const UserController = require('./controller');

exports.setup = function(router) {
    router
    .get('/:id', UserController.get) // เมื่อขอข้อมูล user จาก id
    .get('/', UserController.getAll) // ขอข้อมูล user ทั้งหมด
    .post('/', UserController.create) // สร้าง user ใหม่
    .put('/:id', UserController.update) // อัพเดทข้อมูล user
    .delete('/:id', UserController.destroy) // ลบ user
}
```

- 

- สร้างไฟล์ /users/controller.js เอาไว้จัดการกับ request
```javascript
const mongoose = require('mongoose');
const UserModel = mongoose.model('User');

const UserController = {
    async getAll(req, res) {
        try{
            const users = await UserModel.find();
            res.json({users});
        }catch(err){
            res.status(500).json({status: 500, message: err.message || err});
        }
        
    },
    async get(req, res) {
        try{
            const user = await UserModel.findById(req.params.id)
            res.json({user});
        }catch(err){
            res.status(500).json({status: 500, message: err.message || err});
        }
    }, 
    async create(req, res) {
        try{
            const {username, password, isAdmin = false} = req.body;
            const newUser = new UserModel({username, password, isAdmin});
            const user = await newUser.save();
            res.status(201).json({user});
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
                res.json({user});
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
```

- สุดท้ายสร้างไฟล์ /app/route.js เอาไว้เพิ่ม routes ตามโฟลเดอร์ที่สร้างไว้ใน /app
```javascript
const express = require('express');
const fs = require('fs');

// set routes ให้ไปอ่านจากโฟลเดอร์ app
exports.setupRoutes = function (app) {
	const APP_DIR = __dirname;
	const features = fs.readdirSync(APP_DIR).filter(
		file => fs.statSync(`${APP_DIR}/${file}`).isDirectory()
	);

	features.forEach(feature => {
		const router = express.Router();
		const routes = require(`${APP_DIR}/${feature}/routes.js`);

		routes.setup(router);
		app.use(`/${feature}`, router);
	});
}
```

## ปรับปรุงการบันทึก password ##
- จากโค้ดข้างบน เมื่อลองสร้าง user ใหม่จะพบว่า password จะเก็บลงไปตรงๆ ซึ่งเป็นวิธีการที่ไม่ถูกต้อง
- ดังนั้นต้องเข้ารหัส password ก่อนบันทึกข้อมูล โดยให้แก้ไขไฟล์ /app/users/model.js ตามนี้
```javascript
const bcrypt = require('bcrypt');
// ...

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

// ...
```
- ทดลองบันทึกดูใหม่ จะพบว่า password ถูกเข้ารหัสแล้ว

## จำกัดข้อมูลที่คืนกลับไป ##
- จะเห็นว่า users service เมื่อเรียกขอข้อมูล user กลับไปจะแสดงข้อมูลทั้งหมดกลับไป รวมถึง password ด้วย ซึ่งที่ถูกต้องเราจะต้องไม่คืนค่านี้กลับไปด้วย
- เริ่มจากสร้างไฟล์ /app/serializer.js
```javascript
const Serializer = {
    for(method, resource){
        return this[method](resource);
    }
}

module.exports = Serializer;
```

- สร้างไฟล์ serializer ของแต่ละ services  โดยสร้างไฟล์ /app/users/serializer.js เพื่อจัดการข้อมูล user
```javascript
const Serializer = require('../serializer');

const UserSerializer = {};

Object.assign(UserSerializer, Serializer, {
    getAll(resources){        
        return resources.map(resource => this.serializer(resource));
    },
    get(resource){
        return this.serializer(resource);
    },
    create(resource){
        return this.serializer(resource);
    },
    update(resource){
        return this.serializer(resource);
    }, 
    serializer(resource){
        const {_id, username, isAdmin} = resource;
        return {_id, username, isAdmin};
    }
});
module.exports = UserSerializer;
```

- สุดท้ายกลับมาแก้ไขไฟล์ /app/users/controller.js ให้เรียกใช้งาน serializer
```javascript
const UserSerializer = require('./serializer');

const UserController = {
    async getAll(req, res) {
        //...
            res.json({users: UserSerializer.for('getAll', users)});
        //...        
    },
    async get(req, res) {
        //...
            res.json({user: UserSerializer.for('get', user)});
        //...
    }, 
    async create(req, res) {
        //...
            res.status(201).json({user: UserSerializer.for('create', user)});
       //...
    }, 
    async update(req, res) {
       //...
                res.json({user: UserSerializer.for('update', updatedUser)});
       //...
    }
    //...
}

module.exports = UserController;
```

## Generate Token ##
- ดูเรื่อง [JWT](../)
- เมื่อสร้าง user ใหม่เสร็จ โค้ดเดิมจะคืนค่าข้อมูล user กลับออก ให้แก้ใหม่โดยให้คืนค่า access token กลับไปด้วย
- แก้ไขไฟล์ /app/users/model.js
```javascript
const jwt = require('jsonwebtoken');


UserSchema.methods.genToken = function () {
    return jwt.sign({
        sub: this._id,
        username: this.username,
        isAdmin: this.isAdmin
    }, config.secret, { expiresIn: '1h' });
};
```

- แก้ไฟล์ /app/users/controller.js เพื่อคืนค่า token
```javascript
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
}
```

- gentoken
- login service