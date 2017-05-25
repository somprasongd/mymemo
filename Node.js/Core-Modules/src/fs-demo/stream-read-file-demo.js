const fs = require('fs');
let data = ""; // สร้างตัวแปรมารับค่าที่อ่านได้

const stream = fs.createReadStream('file-from-stream.txt');
stream.setEncoding('utf-8'); // ระบุ encoding
// อ่านข้อมูลมาใส่ไว้ในตัวแปร
stream.on('data', list => data += list);
// เมื่ออ่านเสร็จแล้วให้จะให้ทำอะไรต่อ
stream.on('end', () => console.log(data));