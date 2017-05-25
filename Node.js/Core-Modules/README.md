# Core Module #
Last Updated: 26/05/2017


## File System Module ##
- ใช้ในการอ่าน/เขียนไฟล์ มีทั้งแบบ Asynchronous และ Synchronous
- ตัวอย่าง
  - ลิสไฟล์ทั้งหมดใน directory จะได้รายชื่อออกมาเป็น array
    ```javascript
    const fs = require('fs');

    fs.readdir('c:/', (err, datas) => {
        console.log(datas);
    });
    ``` 
  - การสร้าง directory
    ```javascript
    const fs = require('fs');

    fs.mkdir('myfolder', (err) => {
        if(err){
            console.log('Error:', err.message);
        }
        console.log('Create directory successfully.');
    });
    ```  
  - อ่านไฟล์ json
    ```javascript
    const fs = require('fs');

     // จะได้ออกมาเป็น buffer
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
    ```
    - ตัวอย่างเขียนไฟล์ json จาก object
    ```javascript
    const fs = require('fs');

    // object
    let user = {
        name: 'Somprasong Damyos'
    }

    // แบบนี้จะใช้ไม่ได้ จะเขียนออกไปเป็น [object Object]
    fs.writeFile('user.json', user);

    // ต้องแปลง json เป็น String ก่อน
    fs.writeFile('user2.json', JSON.stringify(user));    
    ```
    - ตัวอย่างเขียนไฟล์โดยใช้ Stream
    ```javascript
    const fs = require('fs');
    let data = "Hello World";

    const stream = fs.createWriteStream('file-from-stream.txt');
    stream.write(data, 'utf-8'); // เขียนข้อมูลลงไป
    stream.end(); // จบการเขียน
    stream.on('finish', () => console.log('Successfully created a file.'));
    ```
    - ตัวอย่างอ่านไฟล์โดยใช้ Stream
    ```javascript
    const fs = require('fs');
    let data = ""; // สร้างตัวแปรมารับค่าที่อ่านได้

    const stream = fs.createReadStream('file-from-stream.txt');
    stream.setEncoding('utf-8'); // ระบุ encoding
    // อ่านข้อมูลมาใส่ไว้ในตัวแปร
    stream.on('data', list => data += list);
    // เมื่ออ่านเสร็จแล้วให้จะให้ทำอะไรต่อ
    stream.on('end', () => console.log(data));
    ```
    - การเปลี่ยนชื่อไฟล์ หรือย้ายไฟล์
    ```javascript
    const fs = require('fs');
    
    // rename(oldFile, newFile, callback)
    fs.rename('./file-from-stream.txt', './new-file-from-stream.txt', err => {
        if(err){
            console.log('Error:', err.message);
        }
        console.log('Rename successfully.');
    });

    // การย้ายไฟล์ rename(file, dir/file, callback)
    fs.rename('./new-file-from-stream.txt', './myfolder/new-file-from-stream.txt', err => {
        if(err){
            console.log('Error:', err.message);
        }
        console.log('Move file successfully.');
    });
    ```
    
## OS Module ##
- เอาไว้ดูข้อมูลของระบบปฎิบัติการ
```javascript
const os = require('os');

console.log(`System informations
Endianness: ${os.endianness()}
Type: ${os.type()}
Platform: ${os.platform()}
Arch: ${os.arch()}
OS Version: ${os.release()}
Home Directory: ${os.homedir()}
Total Memory: ${os.totalmem()} bytes
Free Memory: ${os.freemem()} bytes
Hostname: ${os.hostname()}
Uptime: ${os.uptime()}`);
```

## Path Module ##
- เอาไว้จัดการกับ path ของไฟล์ และไดเร็กทอรี่
```javascript
const path = require('path');

// หาตำแหน่งไฟล์
console.log(`resolve: ${path.resolve('path-demo.js')}`);

console.log(`base name or filename: ${path.basename('path-demo.js')}`);

console.log(`extension name: ${path.extname('path-demo.js')}`);

/*
resolve: C:\Work\mymemo\Node.js\Core-Modules\src\path-demo.js
base name or filename: path-demo.js
extension name: .js
 */
```

## DNS Module ##
- เอาไว้จัดการกับ DNS Server เช่น หา ip address จาก dns
```javascript
const dns = require('dns');

// get ip address from dns
// 1st param => dns
// 2nd param => callback function send error, ip address
dns.lookup('google.co.th', (err, address) => {
    console.log(`Google address: ${address}`); // Google address: 74.125.200.94
});
```

## HTTP Module ##
- เอาไว้สร้าง web server
```javascript
const http = require('http');

function runServer(req, res) {
    let body = 'Welcome to your first web server';
    let contentLength = body.length;
    res.writeHead(200, {
        'Content-Length': contentLength,
        'Content-Type': 'text/html'
    });
    res.end(body);
}

const server = http.createServer(runServer);
server.listen(3000, () => console.log('Server is now running at http://localhost:3000'));
```
- อ่านไฟล์ index.html มาแสดง
```javascript
const http = require('http');
const fs = require('fs');

fs.readFile('./index.html', (err, html) => {
    if(err){
        throw err;
    }
    http.createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(html);
        res.end();
    })
    .listen(3000, () => console.log('Server is now running at http://localhost:3000'));
});
```