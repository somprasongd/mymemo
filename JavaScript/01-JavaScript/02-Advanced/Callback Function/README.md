#### การทำงานของ Callback Function ####

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
