# Mocha #

**Website:** [http://mochajs.org/](http://mochajs.org/ "http://mochajs.org/")

**Installation:** `$ npm i mocha --save-dev` ใช้ -dev เพราะไม่ต้องการใช้ใน production

**Use:**

ควรจะสร้างไฟล์สำหรับทำ Test โดยใช้ชื่อไฟล์ที่ต้องการทดสอบ .test.js เพราะจะสะดวกตอนรันคำสั่งทดสอบ เช่น 

มีไฟล์ชื่อ utils.js

```javascript

module.exports.add = (a, b) => a + b;

module.exports.square = (x) => x * x;
```

ก็สร้างไฟล์utils.test.js ขึ้นมา ซึ่งจะสร้าง test case ขึ้นโดยใช้ `it('message', () => {});` ซึ่งถ้าผลลัพธ์ไม่ได้อย่างที่ต้องการก็ให้ `throw new Error('Message');` ออกไป

```javascript
const utils = require('./utils');

it('should add two number', () => {
  var res = utils.add(33, 11);
  if(res !== 44){
    throw new Error(`Expected 44, but got ${res}.`);
  }
});

it('should square number', () => {
  var res = utils.square(3);
  if(res !== 9){
    throw new Error(`Expected 9, but got ${res}.`);
  }
});
```

การทดสอบ

- แก้ไขไฟล์ package.json ที่ scripts > test เป็น `mocha **/utils.test.js` โดย `**` หมายถึงให้ดูทุก folder หรือใช้ `mocha **/*.test.js` ให้เอาทุกไฟล์ที่ลงท้ายด้วย .test.js

```json
"scripts": {
	"test": "mocha **/*.test.js"
}
```

- รันคำสั่ง `$ npm test`
- กรณีใช้ร่วมกับ nodemon ใช้ `$ nodemon --exec 'npm test'` เพื่อ wacth & auto restart tests หรือจะเอาไปใส่ใน package.json เพิ่มใน scripts > `"test-watch": "nodemon --exec \"npm test\""` ไว้ก็ได้

### การใช้ร่วมกับ Assertion Library ###

ตัว assertion library ที่จะใช้ คือ [expect](expect "https://github.com/mjackson/expect")

**Installation:** `$ npm i expect --save-dev` ใช้ -dev เพราะไม่ต้องการใช้ใน production

**Use:**

```javascript

// using CommonJS modules
var expect = require('expect');

it(should add two number', () => {
  var res = utils.add(33, 11);
  expect(res).toBe(44);
});
```

**Assertion**

- `expect(object).toBe(xx);` เทียบว่าค่าเท่ากันมั้ย `===`
- `expect(object).toNotBe(xx);` เทียบว่าค่าไม่เท่ากันมั้ย `!==`
- `expect({name: "Ball"}).toEqual({name: "Ball"});` กรณีเป็น {} ใช้ toBe ไม่ได้
- `expect({name: "Ball"}).toNotEqual({name: "Ball"});`
- `expect(123).toBeA('number);` ดูว่า type ตรงมั้ย
- `expect([2, 3, 4]).toInclude(5);` ดูว่ามีค่าอยู่ในนั้นมั้ย ใช้กับ array กับ object
- `expect({name: "Ball", age: 31}).toExclude({age: 13});`

### กรณีใช้ Mocha กับ Async ###

ที่ callback function ของ it ให้ใส่พารามิเตอร์ชื่อ done และเรียกใช้หลังการตรวจสอบ

```javascript

// using CommonJS modules
it('should async add two number', (done) => {
  utils.asyncAdd(4, 3, (sum) => {
    expect(sum).toBe(10).toBeA('number');
    done();
  });
});
```

### กรณีใช้ Mocha กับ Express ###

จะใช้โมดูลชื่อ [supertest](supertest "https://github.com/visionmedia/supertest")

**Installation:** `$ npm i supertest --save-dev` ใช้ -dev เพราะไม่ต้องการใช้ใน production

**Use:**

สร้างไฟล์ Web server โดยใช้ express ชื่อ server.js

```javascript

var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.status(200)
      .send('Hello World!');
});

app.listen(3000);

module.exports.app = app;
```

สร้างไฟล์ mocha test ชื่อ server.test.js

```javascript

const request = require('supertest');
var app = require('./server.js').app;

it('should return hello world response', (done) => {
  request(app) // ส่ง express ที่จะทดสอบไป
    .get('/')  // ระบุ method พร้อม path
    .expect(200) // reponse status code
    .expect('Hello World!') // response body
    .end(done) // เมื่อเสร็จแล้วให้ส่ง callback function done ไป
});
```

**กรณีจะใช้งานร่วมกับโมดูล expect**

สร้างไฟล์ Web server โดยใช้ express ชื่อ server.js

```javascript

var express = require('express');

var app = express();

app.get('/users', (req, res) => {
    res .status(200)
      .send([
        {
          name: "A",
          age: 22
        }, {
          name: "B",
          age: 27
        }, {
          name: "C",
          age: 28
        }
      ]);
});

app.listen(3000);

module.exports.app = app;
```

สร้างไฟล์ mocha test ชื่อ server.test.js

```javascript

const request = require('supertest');
const expect  = require('expect');
var app = require('./server.js').app;

it('should return user object response', (done) => {
  request(app)
    .get('/users')
    .expect(200)
    .expect((res) => { // เปลี่ยนส่วนนี้เป็น callback function รับ response object มา
      // ข้างใน function นี้ก็เรียกใช้งานโมดูล expect ได้ตามปกติ
      expect(res.body).toInclude({
        name: 'A',
        age: 22
      });
    })
    .end(done)
});
```

### จัดการแบ่งกลุ่มการทดสอบโดยใช้ describe() ###

ปกติถ้ารัน mocha **/*.test.js โปรแกรมจะปริ้นข้อความต่อกันมาหมด ทำให้แยกยากวันแต่ละบรรทัดเป็นการทดสอบของไฟล์ไหน หรือฟังก์ชันไหน เราจะใช้ `decribe('message', () => {});` มาแบ่งกลุ่มกัน ตัวอย่าง

แบบไม่ใช้ describe()

![No describe()](https://github.com/somprasongd/mymemo/blob/master/Node.js/Mocha/resources/images/no_describe.PNG)

แบบใช้ describe()

```javascript

const request = require('supertest');
const expect  = require('expect');
var app = require('./server.js').app;
describe('Server', () => {
  describe('GET /', () => {
    it('should return hello world response', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect('Hello World!')
        .end(done)
    });
  });


  describe('GET /error', () => {
    // use with expect
    it('should return json object response', (done) => {
      request(app)
        .get('/error')
        .expect(404)
        .expect((res) => {
          expect(res.body).toInclude({
            error: "Page not found!"
          });
        })
        .end(done)
    });
  });

  describe('GET /users', () => {
    it('should return user object response', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude({
            name: 'A',
            age: 22
          });
        })
        .end(done)
    });
  });
});
```

![With describe()](https://github.com/somprasongd/mymemo/blob/master/Node.js/Mocha/resources/images/with_describe.PNG)