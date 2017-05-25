const fs = require('fs');
let data = "Hello World";

const stream = fs.createWriteStream('file-from-stream.txt');
stream.write(data, 'utf-8'); // เขียนข้อมูลลงไป
stream.end(); // จบการเขียน
stream.on('finish', () => console.log('Successfully created a file.'));