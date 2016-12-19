# Express #

Website: [http://expressjs.com/](http://expressjs.com/ "http://expressjs.com/")

repo: [https://www.npmjs.com/package/express](https://www.npmjs.com/package/express "https://www.npmjs.com/package/express")

#### การติดตั้ง ####

    $ npm install express --save

#### ตัวอย่างการใช้งาน ####

    var express = require('express');
    var app = express();
     
    app.get('/', (req, res) => {
      // res.send(); ถ้าส่งเป็น text/html/json express จะจัดการกำหนด content-type ให้เอง
      res.send('Hello World');
    })
    
    // ระบุ port ของ web server 
    app.listen(3000);


#### Object ต่างๆ ####

- Application Object
	- `app.set(name, value);` ไว้สำหรับตั้งค่า environtment variable
	- `app.get(name);` ไว้สำหรับ get ค่า environtment variable
	- `app.use(path, callback);` สร้าง middleware จัดการ request
	- `app.use(express.static(__dirname + '/public'));` สร้าง static folder (folder ที่เปิดให้ใครเข้าถึงก็ได้(public) ไว้ที่ folder ชื่อ public โดย `__dirname` คือ ตำแหน่งของ working directory
	- `app.get(path, callback);` สร้าง middleware จัดการ GET Request
	- `app.post(path, callback);` สร้าง middleware จัดการ POST Request
	- `app.put(path, callback);` สร้าง middleware จัดการ PUT Request
	- `app.delete(path, callback);` สร้าง middleware จัดการ DELETE Request
	- `app.route(path).get(callback).post(callback);` สร้าง middleware จัดการ Request ที่เรียกมายัง path นั้นว่า ถ้าเป็น GET/POST/PUT/DELETE ให้ทำอะไรบ้าง
	
- Request Object
	- `req.query` ไว้ดึงค่า query string ออกมาเป็น Object
	- `req.param` ไว้ดึงค่า routing parameter ออกมาเป็น Object
	- `req.body` ไว้ดึงค่า bogy message ออกมาเป็น Object ต้องใช้ bodyParser() ช่วย


- Response Object
	- `res.status(code);` ไว้กำหนด HTTP Status Code
	- `res.set(field, value);` ไว้กำหนด HTTP Response Header
	- `res.redirect(status, url);` redirect ไปยัง URL ที่กำหนด
	- `res.send(body);` หรือ `res.send(status, body);` ไว้ส่งผลลัพท์กลับไป ซึ่ง content-type จะเปลี่ยนไปตาม body ที่ส่งไป
	- `res.json(body);` หรือ `res.json(status, body);` ไว้ส่งผลลัพท์กลับไปในรูปแบบ json
	- `res.render(view, [local], callback);` ใช้ในการ render view แล้วส่งเป็น HTML Response กลับไป


#### HTML Template Engine ####

การแสดงหน้าเวบเพจ ปกติข้อมูลมันไม่ได้เป็น static แต่มันจะส่งข้อมูลแบบ dynamic ดังนั้นจะใช้วิธีทำเป็น template เอาไว้ แล้วใช้ `res.render('view');` render และส่ง response กลับไป ซึ่ง Template Engine ที่ใช้ใน express นั้นมีหลายตัว จะยกตัวอย่างการใช้งานตัวที่นิยมใช้ ดังนี้

- **hbs**

Website: [http://handlebarsjs.com/](http://handlebarsjs.com/ "http://handlebarsjs.com/")
	
Repo: [https://www.npmjs.com/package/hbs](https://www.npmjs.com/package/hbs "https://www.npmjs.com/package/hbs")

Install : `$ npm install hbs`

Use: ให้สร้างไฟล์ template ไว้ที่ folder ชื่อ **views**

แบบใช้ไฟล์ template เป็น .hbs 

    app.set('view engine', 'hbs');

แบบใช้ไฟล์ template เป็น .html 

    app.set('view engine', 'html');
	app.engine('html', require('hbs').__express);

ตัวอย่างการส่ง parameter ไปให้ template

	// ไฟล์ app.js    
	app.get('/about', (req, res) =>{
		res.render('about.hbs', {
			pageTitle: 'About Page',
			currentYear: new Date().getFullYear()
		});
	});

    // ไฟล์ template about.hbs
	<!DOCTYPE html>
	<html>
	  <head>
	    <meta charset="utf-8">
	    <title>Some Website</title>
	  </head>
	  <body>
	    <h1>{{pageTitle}}</h1>
	    <p>Some text here</p>
		<footer>
			<p>Copyright {{currentYear}}</p>
		</footer>
	  </body>
	</html>

การทำ partial คือกรณีมีบางส่วนแสดงผลเหมือนกันในหลายๆ หน้า เช่น header, footer เราสามารถแยกส่วนไปสร้างเป็นไฟล์เก็บไว้ใน patial folder แล้วเรียกใช้ในทุกๆ หน้าได้

	// app.js
	var app = express();

	hbs.registerPartials(__dirname + 'views/partials/);   
	app.set('view engine', 'hbs');

    // views/partials/footer.hbs
	<footer>
		<p>Copyright {{currentYear}}</p>
	</footer>

	// views/about.hbs
	<!DOCTYPE html>
	<html>
	  <head>
	    <meta charset="utf-8">
	    <title>Some Website</title>
	  </head>
	  <body>
	    <h1>{{pageTitle}}</h1>
	    <p>Some text here</p>
		
		{{> footer}}
	  </body>
	</html>

การใช้ helper ไว้สร้างตัวแปร เพื่อเรียกใช้งานใน template 

	// app.js
	var app = express();

	hbs.registerPartials(__dirname + 'views/partials/);   
	app.set('view engine', 'hbs');

	// ในฟังก์ชันสามารถรับ parameter ได้
	hbs.registerHelper('getCurrentYear', () => {
		return new Date().getFullYear();
	});

    // views/partials/footer.hbs
	<footer>
		<p>Copyright {{getCurrentYear}}</p>
	</footer>

- **Jade**

- **EJS**


#### Express Middleware ####

express สามารถสร้าง middleware เพื่อให้ทำงานแบบ FIFO (First-In-First-Out)

    app.use((req, res, next) => {
		// req คือ Object ของ HTTP Request
		// res คือ Object ของ HTTP Response
		// next คือ เรียกฟังก์ชัน next(); เพื่อไปยัง middleware ตัวถัดไป ถ้าไม่เรียกจะไม่ออกไปจาก middleware ตัวนี้		
		next();
	});

ตัวอย่างทำ middleware เก็บ log

    const express = require('express);
	const fs = require('fs');
	var app = express();

	app.use((req, res, next) => {
		var now = new Date().toString();
		var log = `${now}: ${req.method} ${req.url}`ว

		console.log(log);
        fs.appendFile('server.log', log + '\n', (err) => {
			if(err){
				console.log('Unable to append to server.log.');
			}
		});
		next();
	});

กรณีที่เกิดข้อผิดพลาดขึ้น เราจะไม่เรียก next(); เพื่อให้ทำงาน middleware ถัดไป ใช้ `res.render('error_page.hbs');` แทนประมาณนี้