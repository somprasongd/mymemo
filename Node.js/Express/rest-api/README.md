# RESTful API with Express #

## ติดตั้ง Express ##
- สร้างโฟลเดอร์ชื่อ "rest-api"
```
$ mkdir rest-api
$ cd rest-api
```
- สร้างไฟล์ package.json
```
$ npm init -y
```
- ติดตั้ง packages ที่จำเป็นต้องใช้งาน
  - express
  - body-parser
  - cors
  - morgan
```
$ npm i --save express body-parser cors morgan
```
- ติดตั้ง nodemon ใช้สำหรับทดสอบโปรแกรม
```
$ npm i --save-dev nodemon
```
- สร้างไฟล์ ./config/config.js ไว้สำหรับเก็บการตั้งค่าต่างๆ เช่น PORT
```javascript
module.exports = {
    port: process.env.PORT || 3000 // ถ้าไม่ระบุใน env ให้ใช้ port 3000 แทน
}
```
- สร้างไฟล์ ./config/index.js ไว้สำหรับ export module config นี้ออก
```javascript
const Config = require('./config');

module.exports = Object.assign({}, Config);
```
- แก้ไขไฟล์ package.json เพื่อใช้งาน script รันทดสอบโปรแกรม
```json
"scripts": {
    "dev": "SET PORT=8080 && nodemon ./server.js"
  }
```
- สร้างไฟล์ server.js
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config'); // auto import config/index.js

const app = express();
const PORT = config.port;

// set enviroments
app.use(logger('dev'));
// ให้ body-parser แปลง body message เป็น json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set routes
app.get('/', (req, res) => {
  // res.send(); ถ้าส่งเป็น text/html/json express จะจัดการกำหนด content-type ให้เอง
  res.send('Hello World');
})

// ระบุ port ของ web server 
app.listen(PORT, err => {
  if(err){
    console.log('Start server error:', err.message);
  }else{
    console.log('Server is runnig at http://localhost:' + PORT);
  }
});
```
- Start server
```
$ npm run dev

> rest-api@1.0.0 dev C:\Work\mymemo\Node.js\Express\rest-api
> SET PORT=8080 && nodemon ./server.js

[nodemon] 1.11.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node ./server.js`
Server is runnig at http://localhost:8080
```

## ออกแบบการทำงาน ##
- นำ MVC มาประยุกต์ใช้ โดยจะใช้ C (controller) มาจัดการกับ request ที่รับเข้ามาว่าต้องการอะไร แล้วส่งต่อไปให้ M (model) ซึ่งจะมี business logic กับการติดต่อฐานข้อมูลอยู่ที่นี่ เมื่อได้ผลลัพธ์ออกมาแล้ว model จะส่งไปหา controller ให้ส่ง respone กับไปหา client

![MVC](./resources/mvc.png)

- แต่เราจะเพิ่ม express.Router() มารับ request แล้วให้ Router ส่งต่อไปยัง controller อีกทีนึงแทน

![MVC](./resources/router.png)

- จัดการโครงสร้างของโปรเจคโดยใช้วิธี Folder by Features คือการแบ่งโฟลเดอร์ออกตาม resources และข้างในจะมี routes.js, controller.js, model.js เช่น
```
/app
  /patients
    controller.js
    model.js
    routes.js
  /visits
    controller.js
    model.js
    routes.js
```

## จัดการ Routes ##
- โดยปกติการสร้าง route จะใช้ app.get('/', (req, res) => {})
- แต่เรามี resources แบ่งตาม features ต่างๆ แล้วต้องมาใส่ชื่อ features ซ้ำๆ กันแบบนี้มันไม่ดีเท่าไหร่ จึงเปลี่ยนมาใช้ express.Router() แทน
```javascript
// app/patients/routes.js
const router = express.Router();

router.get('/', (req, res) => {});
router.get('/:id', (req, res) => {});

module.exports = router;

// server.js
const patiens = require('./app/patients/routes.js');
const visits = require('./app/visits/routes.js');

app.use('/patients', patiens);
app.use('/visits', visits);
```
- แต่ถ้าโปรเจคเรามีหลายๆ features จะมาเขียน require() ทีละตัว มันจะเหนื่อยไป ก็เลยสร้างฟังก์ชัน setupRoutes() ขึ้นมาแทน
  - สร้างไฟล์ ./app/routes.js
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
      app.use(`/api/${feature}`, router);
    });
  }
  ```
  - เพิ่มโค้ดจัดการ routes ที่ ./server.js
  ```javascript
  const routes = require('./app/routes');
  // ...  
  routes.setupRoutes(app);
  ```
  - แก้ไขไฟล์ ./app/{featureName}/routes.js
  ```javascript
  // ./app/patients/routes.js
  // แก้เหลือแค่ function setup
  exports.setup = function(router) {
      router.get('/', (req, res) => res.send('Hello world.'))
  }
  ```

## Controller ##
- เมื่อจัดการ request ที่เรียกเข้ามาเสร็จแล้วว่าต้องวิ่งไปที่ routes ไหน ซึ่ง routes แต่ละตัวต้องรู้ว่าจะเอา controller ตัวไหนมาจัดการต่อในแต่ละ features
- ตัวอย่างสร้างไฟล์ `./app/patients/controller.js`
```javascript
const PatientController = {
    getAll(req, res) {
        res.send('Hello World');
    },
    get(req, res) { // get by id

    }, 
    create(req, res) {

    }
}

module.exports = PatientController;
```
- แก้ไขไฟล์ `./app/patients/routes.js` เพื่อเรียกใช้งาน controller
```javascript
const PatientController = require('./controller');

exports.setup = function(router) {
    router
    .get('/:id', PatientController.get)
    .get('/', PatientController.getAll)
    .post('/', PatientController.create)
}
```

## เชื่อมต่อ Database ##
- ในตัวอย่างนี้จะใช้งาน PostgreSQL ดังนั้นต้องติดตั้ง packages เพิ่ม คือ [pg-promise](https://github.com/vitaly-t/pg-promise)
```
$ npm i --save pg-promise
```
- แก้ไขไฟล์ ./config/db.js เพื่อกำหนดค่าการเชื่อมต่อฐานข้อมูล
```javascript
module.exports = {
  port: process.env.PORT || 3000, // ถ้าไม่ระบุใน env ให้ใช้ port 3000 แทน
  pgpConnection: process.env.PGP_CONNECTION, // postgres://username:password@host:port/database
}
```
- สร้างไฟล์ ./config/db.js
```javascript
const config = require('./config');
// Loading and initializing the library:
const pgp = require('pg-promise')();

// Creating a new database instance from the connection details:
const db = pgp(config.pgpConnection);

// Exporting the database object for shared use:
module.exports = db;
```
- แก้ไขไฟล์ ./config/index.js เพื่อให้ export db object ออกไปด้วย
```javascript
const Config = require('./config');
const db = require('./db');

module.exports = Object.assign({}, Config, {db});
```

- การใช้งาน pg-promise
  - ดูรายละเอียดเพิ่มเติม <https://github.com/vitaly-t/pg-promise>
  - ตัวอย่างการใช้งาน <https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example>

## สร้าง Model ##
- ในต้องละ features จะมี model.js เป็นของตัวเอง เอาจัดการกับ business logic กับติดต่อการฐานข้อมูล โดยจะรับพารามิเตอร์มาจาก controller เมื่อทำงานเสร็จจะรีเทิร์นค่ากลับไปยัง controller
- สร้างไฟล์ ./app/patients/model.js มีฟังก์ชันสำหรับค้นหาข้อมูลทั้งหมดจากตาราง patient
```javascript
// import db object
const db = require('../../config').db;
// create Patients object
const Patients = {
  // สร้างเป็น async function มันจะรีเทิร์นเป็น promise ให้อัตโนมัติ
  async findAll() {
      try {
          let patients = await db.any('select * from patient');
          return patients;
      } catch (err) {
          throw err;
      }
  }
}

module.exports = Patients;
```
- กลับไปแก้ไฟล์ ./app/patients/controll.js ให้เรียกใช้งาน model
```javascript
const PatientModel = require('./model');
const PatientController = {
    getAll(req, res) {
        PatientModel.findAll()
        .then(patients => {
            res.send({patients});
        })
        .catch(err => {
            res.status(500).send({err: err.message});
        });
    },
    get(req, res) { // get by id

    }, 
    create(req, res) {

    }
}

module.exports = PatientController;
```

## ปรับปรุง Model ##
- ถ้าสังเกตดูในทุกๆ model จะมีการทำงานที่ซ้ำๆ กัน ดังนั้น ควรเขียนฟังก์ชันเหล่านั้นออกมาไว้ใน medel ตรงกลาง แล้วให้แต่ละตัวไปเรียกงานแทน เช่น
- สร้างไฟล์ ./app/model.js
```javascript
const Model = {
    db: require('../config').db, // เพื่อให้ /feature/model.js ตัวอื่น สามารถใช้งาน db object ได้ ผ่าน this.db
    async findAll() {
        try {
            let patients = await this.db.any(`select * from patient`);
            return patients;
        } catch (err) {
            throw err;
        }
    },
    async find(id) {
        
    },
    async create(attrs) {

    },
    async update(id, attrs) {

    },
    async destroy(id) {

    }
};

module.exports = Model;
```
- กลับไปแก้ไขไฟล์ ./app/patient/model.js
```javascript
const Model = require('../model');

const Patients = {};

Object.assign(Patients,
    Model, {
        // other functions in each model
    });

module.exports = Patients;
```
- ลองเรียกใช้งานดู ก็จะได้ผลลัพธ์เหมือนกัน
- แต่ใน ./app/model.js เราต้องการทำให้เป็น model กลาง ที่ตัวอื่นสามารถนำไปใช้ได้ ดังนั้นชื่อตารางจึงต้องเปลี่ยนไปตามแต่ละ model ด้วย
  - แก้ไขไฟล์ ./app/patients/model.js เพื่อเพิ่มชื่อตาราง
  ```javascript
  const Patients = {
      table: 'patient'
  };
  ```
  - แก้ไขไฟล์ ./app/model.js ให้เอาชื่อตารางากตัวแปร `table` แทน
  ```javascript
   let patients = await this.db.any(`select * from ${this.table}`);
  ```
  - ทดลองเรียกใช้งานดู ก็จะได้ผลลัพธ์เหมือนกัน
  
### การ Insert & Update ###
- การ insert & update จะมีการตรวจสอบข้อมูลที่ client ส่งมาก่อนว่ามีฟิลด์ที่ห้าม insert/update อยู่ด้วยหรือไม่
- เพิ่มฟังก์ชันการตรวจสอบที่ ./app/model.js
```javascript
withPermitedAttrs(attrs, init = {}) {
    // ใช้ reduce ในการตรวจสอบเลือกเอาเฉพาะ attrs ที่อนุญาตเท่านั้น โดยตรวจสอบจาก this.permittedAttrs
    // สามารถกำหนดค่าเริ่มต้นที่ต้องมีได้ ผ่าน init
    return this.permittedAttrs.reduce(
        (record, attr) => {
            return attrs[attr] ? Object.assign(record, {
                [attr]: attrs[attr]
            }) : record
        }, init);
}
```
- ดังนั้นในแต่ละ ./app/{features}/model.js ต้องเพิ่มตัวแปร `permittedAttrs` ไว้เป็นของตัวเอง
```javascript
// ./app/patients/model.js
const Patients = {
    table: 'patient',
    permittedAttrs: ['hn', 'firstname', 'lastname', 'gender', 'dob']
};
```
- เพิ่มโค้ดฟังก์ชัน create ใช้สำหรับการ insert ข้อมูลใหม่
```javascript
async create(attrs) {
    try {
        // เลือกเอาเฉพาะ  keys = ['hn', 'firstname', 'lastname', 'gender', 'dob']
        const datas = this.withPermitedAttrs(attrs, {
            active: true // insert ใหม่ ต้องมี active = true
        });
        /* ใช้ Object.keys(datas) จะได้ชื่อคีย์เป็น ['hn', 'firstname', 'lastname', 'gender', 'dob']
        ใช้ reduce เอาชื่อ keys มาต่อ string เพื่อเอาไปใช้เป็น named parameters ของ pg-promise 
        values =  $(hn), $(firstname), $(lastname), $(gender), $(dob)
        */
        const values = Object.keys(datas).reduce((acc, curr) => {
            return acc + (acc.length === 0 ? '' : ', ') + ` $(${curr})`;
        }, '');
        // pg-promise ใช้ $(this~) เพื่อเอาชื่อ keys จาก object ออกมาต่อเป็นชื่อ columns ให้
        const sql = `INSERT INTO ${this.table} ($(this~)) VALUES (${values}) RETURNING *`;
        // RETURNING * คือ เมื่อ insert สำเร็จให้รีเทิร์นค่าทุกฟิลด์ออกมา ใส่ใน patient
        let patient = await this.db.one(sql, datas);
        return patient;
    } catch (err) {
        throw err;
    }
}
```
- เพิ่มโค้ดของ controller.js ให้มาเรียกใช้งาน `create`
```javascript
create(req, res) {
    PatientModel.create(req.body)
    .then(patient => {
        res.send({patient});
    })
    .catch(err => {
        res.status(500).send({err: err.message});
    });
}
```
- จัดการ request ที่มีเป็น POST ให้ไปเรียกใช้งาน controller.create
```
.post('/', PatientController.create)
```
- เพิ่มโค้ดฟังก์ชัน update ใช้สำหรับการ update ข้อมูล
```javascript
async update(id, attrs) {
    try {
        // เลือกเอาเฉพาะ  keys = ['hn', 'firstname', 'lastname', 'gender', 'dob']
        const datas = this.withPermitedAttrs(attrs);
        // "hn" = $(hn), "firstname" = $(firstname), "lastname" = $(lastname), "gender" = $(gender), "dob" = $(dob)
        const values = Object.keys(datas).reduce((acc, curr) => {
            return acc + (acc.length === 0 ? '' : ', ') + `"${curr}" = $(${curr})`;
        }, '');
        const sql = `UPDATE ${this.table} SET ${values} WHERE id = ${+id} RETURNING *`;
        let patient = await this.db.one(sql, datas);
        return patient;
    } catch (err) {
        throw err;
    }
}
```
- เพิ่มโค้ดของ controller.js ให้มาเรียกใช้งาน `update`
```javascript
update(req, res) {
    PatientModel.update(req.params.id, req.body)
    .then(patient => {
        res.send({patient});
    })
    .catch(err => {
        res.status(500).send({err: err.message});
    });
}
```
- จัดการ request ที่มีเป็น PUT ให้ไปเรียกใช้งาน controller.update
```
.put('/:id', PatientController.update)
```

### การ Delete ###
- เพิ่มโค้ดฟังก์ชัน destroy ใช้สำหรับการลบข้อมูล
```javascript
async destroy(id) {
    try {
        let result = await this.db.result(`delete from ${this.table} where id = $1`, +id); // +id คือแปลง string to integer
        // rowCount = number of rows affected by the query
        return result.rowCount;
    } catch (err) {
        throw err;
    }
}
```
- เพิ่มโค้ดของ controller.js ให้มาเรียกใช้งาน `destroy`
```javascript
destroy(req, res) {
    PatientModel.destroy(req.params.id)
    .then(patient => {
        res.status(204).send();
    })
    .catch(err => {
        res.status(500).send({err: err.message});
    });
}
```
- จัดการ request ที่มีเป็น DELETE ให้ไปเรียกใช้งาน controller.destroy
```
.delete('/:id', PatientController.destroy)
```

## เทคนิคเลือกส่งข้อมูลกลับไปเฉพาะบางฟิลด์ ##
- เช่นเมื่อบันทึกข้อมูล patient คนใหม่ เสร็จแล้ว ต้องการให้รีเทิร์นเฉพาะ "id", "hn" กลับออกไปเท่านั้น สามารถทำได้ดังนี้
- สร้างไฟล์ ./app/serializer.js
```javascript
const Serializer = {
    for(method, resource){
        return this[method](resource);
    }
}

module.exports = Serializer;
```
- สร้างไฟล์ ./app/patients/serializer.js
```javascript
const Serializer = require('../serializer');

const PatientSerializer = {};

Object.assign(PatientSerializer, Serializer, {
    create(resource){
        const {id, hn} = resource;
        return {id, hn};
    }
});

module.exports = PatientSerializer;
```
- นำ serializer นี้ไปใส่ใน controller
```javascript
const PatientSerializer = require('./serializer');

// ...
create(req, res) {
    PatientModel.create(req.body)
    .then(patient => {
        res.send({patient: PatientSerializer.for('create', patient)});
    })
    .catch(err => {
        res.status(500).send({err: err.message});
    });
}
// ...
```
- ลองทดสอบดู จะได้แบบนี้ `{"patient":{"id":9,"hn":"1700000007"}}`