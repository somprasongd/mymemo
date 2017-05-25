const fs = require('fs');

let user = {
    name: 'Somprasong Damyos'
}

// แบบนี้จะใช้ไม่ได้ จะเขียนเป็น [object Object]
fs.writeFile('user.json', user, err => {
    if(err){
        console.log('Error: ', err.message);
    }
});

// ต้องแปลง json เป็น String ก่อน
fs.writeFile('user2.json', JSON.stringify(user), err => {
    if(err){
        console.log('Error: ', err.message);
    }
});