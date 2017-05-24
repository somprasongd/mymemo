# Callback Function #
Last Updated: 23/05/2017

## การทำงานของ Callback Function ##

คือฟังก์ชั่นที่ถูกใช้เป็นค่าอาร์กิวเมนต์ของอีกฟังก์ชั่นนึง ซึ่งฟังก์ชั่นนี้จะถูกเรียกใช้งานกลับภายหลังจากภายในฟังก์ชั่นที่ถูกส่งไป

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

getUser(123, (userObj) => {
    console.log(userObj);
});

/* Result wait for 2 sec
Object {id: 123, name: "Somprasong"}*/
```

**หมายเหตุ** แนะนำให้ใช้ arrow function ในการทำ callback function แต่ไม่ควรใช้เมื่อต้องการใช้ `this` และ `arguments` หรือใช้สร้าง function ใน object

## Nested Callbacks Hell ##
- คือการเรียก callbacks function ซ้อนกันหลายๆ ชั้น ทำให้โค้ดดูรก อ่านเข้าใจยาก แก้ไขยาก
- ตัวอย่าง
```javascript
let someDB;
let someWebAPI;
let token;
let securi
// uses callbacks
someWebAPI.get('/login', (req, res) => {
  token.checkToken(req.token, safe => {
      someDB.find(username, user => {
          security.checkPassword(user.password, req.password, matched => {
              token.createToken(user.id, userData => {
                  res.send(userData);
              })
          })
      })
  })
});
```
- ถ้าเปลี่ยนมาใช้ [Promise](../Promise) โค้ดจะดูสะอาดขึ้น
```javascript
let someDB;
let someWebAPI;
let token;
let securi
// uses promise
someWebAPI.get('/login')
    .then(token.checkToken(req.token))
    .then(someDB.find(username))
    .then(security.checkPassword(user.password, req.password))
    .then(createToken(user.id))
    .then(res.send(userData));
```