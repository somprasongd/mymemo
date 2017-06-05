# Fetch API #

- การใช้งาน มันจะงานแบบ Promise โดยมี default เป็น GET
```javascript
fetch('http://localhost:8080/resources')
  .then(res => res.json())
  .then(json => console.log(json));
```

- การเรียกใช้งาน HTTP Method อื่นๆ
```javascript
fetch('http://localhost:8080/authentication', {
    method: 'POST',
    headers: {
        'Accept': 'application/json', // รับข้อมูลกลับมาเป็น json
        'Content-Type': 'application/json', // ส่งข้อมูลไปเป็น json
    },
    body: JSON.stringify({
        username: 'ball',
        password: '1234'
    })
})
  .then(res => res.json())
  .then({user} => console.log(user));
```