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

- สร้างไฟล์ server.js
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config'); // auto import ./config/index.js
const routes = require('./app/routes');

const app = express();
const PORT = config.port;

// set enviroments
// ให้ body-parser แปลง body message เป็น json
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// setup routes
routes.setupRoutes(app);

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

- users serive
- save password
- gentoken
- login service