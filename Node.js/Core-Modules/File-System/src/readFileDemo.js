const fs = require('fs');

fs.readFile('./data.json', (err, data) => {
    console.log(data); // Show Buffer
});

// จะแสดงข้อความให้ใส่ utf-8 เพิ่มเข้าไป
fs.readFile('./data.json', 'utf-8', (err, data) => {
    console.log(data); // show string
});

// วิธีแปลง String เป็น json object
fs.readFile('./data.json', 'utf-8', (err, data) => {
    if(err){
        console.error('unable to read file.');
    }
    try{
        const json = JSON.parse(data);
        console.log(json.firstname);
    }catch(err){
        console.error('invalid json in file');
    }
});