const fs = require('fs');

fs.readFile('./data.json', (err, data) => {
    console.log(data); // Show Buffer
});

// ใช้ toString() มาแปลงจาก buffer เป็น String
fs.readFile('./data.json', (err, data) => {
    console.log(data.toString()); // show string
});

// หรือให้ใส่ utf-8 เพิ่มเข้าไป data ที่ได้ออกมาจะเป็น String
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