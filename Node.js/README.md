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
![Blocking V/S Non-Blocking](/resources/images/non-blockin-io.PNG)
ภาพจาก [The Complete Node.js Developer Course 2.0 | Udemy](https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/t/lecture/5525228)

#### การทำงานของ Event-Driven ####

#### การใช้งาน Require ####

ใช้ require ในการเรียกใช้งาน module อื่น ในโค้ดของเรา

- core module ใช้ `require('module name');` ดูว่ามีอะไรให้ใช้บ้างจาก [Doc](https://nodejs.org/api/)

    ```javascript
	const fs = require('fs');

	fs.appendFile('greetings.txt', 'Hello World!');
	```
- module ที่สร้างเอง ใช้ `require('./notes');` ต้องระบุตำแหน่งของไฟล์ (ถ้าไม่ใส่นามสกุลไฟล์ require จะไปถ้าที่ .js ให้เอง) โดยไฟล์ notes.js ต้องมี module.exports หรือ exports ด้วย

- 3rd party module จาก npm
	- เริ่มต้นใช้คำสั่ง `npm init` เพื่อสร้างไฟล์ package.json
	- ต้องติดตั้ง module ที่จะใช้งานจาก npm ใช้คำสั่ง `npm install [module name] --save` โดย --save คือให้บันทึกลงในไฟล์ package.json ด้วย แต่ถ้าต้องการติดตั้งแบบ global ใช้ -g แทน
	- การ require เข้าใช้ `require('[module name]');` ระบุชื่อไปเลย เหมือน core module