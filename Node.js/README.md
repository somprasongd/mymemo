# Node.js #

### ติดตั้ง Node.js ###

1. Install Node.js ดาวน์โหลด [Node.js v6.9.2 LTS](https://nodejs.org/en/)
2. เปิด CMD/Terminal ทดสอบรันคำสั่ง `node -v` และ `npm -v`

### Text Editor ###
- [ATOM](https://atom.io/)
- [Vistual Studio Code](https://code.visualstudio.com/)
- [Netbeans](https://netbeans.org/)

### Node.js คืออะไร ###

Node.js คือ JavaScript runtime ที่สร้างมาจาก Chrome's V8 JavaScript engine โดยหัวใจสำคัญคือการใช้ event-driven กับ non-blocking I/O

มี npm (Node Package Manager) ไว้ติดตั้ง module ต่างๆ ใน Node.js package ecosystem มาใช้งานได้

Object | GG Chrome | Node.js
------------ | ------------ | -------------
Global Object | window | global
DOM Object | document | ไม่มี
Process Object | ไม่มี | process

#### การทำงานแบบ Non-Blocking I/O ####
![Blocking V/S Non-Blocking](https://github.com/somprasongd/mymemo/blob/master/Node.js/resources/images/non-blockin-io.PNG)

ภาพจาก [The Complete Node.js Developer Course 2.0 | Udemy](https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/t/lecture/5525228)

#### การทำงานของ Call Stack & Event Loop ####
![eventloop 1](https://github.com/somprasongd/mymemo/blob/master/Node.js/resources/images/event_loop_01.gif)

![eventloop 1](https://github.com/somprasongd/mymemo/blob/master/Node.js/resources/images/event_loop_02.gif)

![eventloop 1](https://github.com/somprasongd/mymemo/blob/master/Node.js/resources/images/event_loop_03.gif)

ภาพจาก [The Complete Node.js Developer Course 2.0 | Udemy](https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/t/lecture/5525228)

#### การทำงานของ Callback Function ####

คือส่งฟังก์ชันไปใน function ที่เรียกใช้ เพื่อเมื่อมันทำงานเสร็จแล้วให้เรียกฟังก์ชันไหนทำงานต่อ

    ```javascript
    var getUser = (id, callback) => {
	var user = {
		id: id,
		name: 'Somprasong'
	};

	setTimeout(() => {
		callback(user);
	}, 2000);
    }

    gerUser(123, (userObj) => {
	console.log(userObj);
    });
    ```

#### Node Module ####

ใช้ require ในการเรียกใช้งาน module อื่น ในโค้ดของเรา เช่น `const fs = require('fs');`

โดยจะมี module อยู่ 4 ประเภท ดังนี้

- Core Module ใช้ `require('module name');` จะเป็น module ที่มีมาใน Node.js เลย ดูว่ามีอะไรให้ใช้บ้างจาก [Doc](https://nodejs.org/api/)

    ```javascript
	const fs = require('fs');

	fs.appendFile('greetings.txt', 'Hello World!');
    ```
    
- File Module เป็น module ที่่สร้างขึ้นมาเองเอง ใช้ `require('./notes');` ต้องระบุตำแหน่งของไฟล์ (ถ้าไม่ใส่นามสกุลไฟล์ require จะไปถ้าที่ .js ให้เอง) โดยไฟล์ notes.js ต้องมี module.exports หรือ exports ด้วย

- Folder Module จะระบุ path ไปยังโฟลเดอร์ที่มีไฟล์ package.json เช่น `var say = require('./module');`

- Third-party Module เป็น module ที่ติดตั้งผ่าน npm และการ require ใช้ `require('[module name]');` ระบุชื่อไปเลย เหมือน core module

#### การสร้าง module (ต้องกลับมาอัพเดทอีกที เผื่อเข้าใจผิดอยู่) ####

ต้องสร้างไฟล์ xxx.js ขึ้นมา และทำการ export ส่วนที่ต้องการให้ใช้งานออกไป ซึ่งสามารถทำได้ 2 วิธี

1. ใช้ `exports.xxx = function(){};`

2. ใช้ `module.exports = {};` หรือ `module.exports.xxx = function(){};`

ซึ่งเมื่อเราเรียกใช้ require('path'); ตัว function require(path); จะ `return module.exports;` ออกมาให้ และมีการสร้างตัวแปร `var exports = module.exports = {};`


#### NPM ####

- เริ่มต้นใช้คำสั่ง `npm init` เพื่อสร้างไฟล์ package.json
- ต้องติดตั้ง module ที่จะใช้งานจาก npm ใช้คำสั่ง `npm install [module name] --save` โดย --save คือให้บันทึกลงในไฟล์ package.json ด้วย แต่ถ้าต้องการติดตั้งแบบ global ใช้ -g แทน
- การระบุ version ทำได้โดย `npm install <module_name>@4.2.3` ซึ่งเลขเวอร์ชันจะเป็นแบบ major.minor.patch
- การอัพเดท ใช้ `npm update <module_name>` สามารถใส่ --save หรือ -g ได้
- การลบ ใช้ `npm uninstall <module_name>` สามารถใส่ --save หรือ -g ได้
- การระบุเลขเวอร์ชัน
	- ระบุเลขเวอร์ชันที่ต้องการเลย เช่น `npm install express@4.12.0`
	- ระบุเป็นช่วง <, <=, >, >= เช่น `npm install express@">=4.12.0"`
	- ระบุเป็นช่วง ~ (tilde) ถ้าระบุ minor จะเอา patch สูงสุด ถ้าระบุ major จะเอา minor สูงสุดมา เช่น `npm install express@"~1.2.3"` หมายถึงให้เอาเวอร์ชัน >=1.2.3 แต่ < 1.3.0
	- ระบุช่วง ^ (caret) จะอัพเดทส่วนที่ต่ำกว่า **“หลักซ้ายสุดที่ไม่ใช่ศูนย์”** เช่น `npm install express@"^1.2.3"` หมายถึง >=1.2.3 < 2.0.0 หรือ `npm install express@"^0.2.3"` หมายถึง >=0.2.3 < 0.3.0


#### Restarting App with Nodemon ####

ปกติเวลาแก้ไขโค้ดจะต้องรันใหม่ทุกครั้ง เช่น `node app.js` ซึ่งถ้าไม่อยากมานั่งรันไฟล์ใหม่ทุกครั้งที่มีการแก้ไขก็ใช้ module ที่ชื่อ nodemon มาช่วย

- เริ่มจาก `npm install nodemon -g`
- เวลารันไฟล์เปลี่ยนมาเป็น `nodemon app.js` แทน
- การ shutdown nodemon ใช้ Ctrl + C

#### การใช้งานกับ JSON ####

	```javascript
	// แปลงจาก Object เป็น JSON
	var obj = {
		name: "Somprasong"
	};
	var strObj = JSON.stringify(obj);

	// แปลงจาก JSON เป็น Object
	var personStr = '{"name": "Somprasong", "age": 31}';
	var person = JSON.parse(personStr);
	```

#### Debuging ####

- ใช้คำสั่ง `node debug app.js`

- ถ้าต้องการไป statement ถัดไป พิมพ์ n แล้ว Enter

- ถ้าต้องการจบโปรแกรมเลย พิมพ์ c แล้ว Enter

- ถ้าต้องการออกจาก debug mode ใช้ Ctrl + C หรือ พิมพ์ quit

- ในระหว่าง debug mode ถ้าต้องการเขียนโค้ดเพิ่ม หรือเอาค่าตัวแปรที่ผ่าน debug มาแล้วให้เข้า repl mode โดยพิมพ์ repl แล้ว Enter ถ้าต้องการออกใช้ Ctrl + C

- ถ้าอยากระบตำแหน่งที่ต้องการจะ debug ให้แก้ไขไฟล์ที่จะ debug โดยจะเริ่มที่บรรทัดไหน ใส่ `debugger;` แล้วรันคำสั่ง `node debug app.js` มันจะหยุดที่ statement แรก จากนั้นให้พิมพ์ c แล้ว Enter มันจะพาไปยังบรรทัดที่พิมพ์ `debugger;` ไว้

#### อื่นๆ ####

- การใช้ arrow function เช่น `var myFunc = () => {};` ไม่ควรใช้เมื่อต้องการใช้ `this` และ `arguments` หรือใช้สร้าง function ใน object
