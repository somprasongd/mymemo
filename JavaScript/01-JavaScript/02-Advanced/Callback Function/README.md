#### การทำงานของ Callback Function ####

คือส่งฟังก์ชันไปในฟังก์ชันที่เรียกใช้งาน เพื่อเมื่อมันทำงานเสร็จแล้วให้เรียกฟังก์ชันที่ส่งเข้าไปให้ทำงานต่อ

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