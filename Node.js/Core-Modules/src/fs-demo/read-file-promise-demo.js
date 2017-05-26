const fs = require('fs'); // ใช้อ่านไฟล์

function readJSONFile(fileName){
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, (err, data) => {
        if(err){
            reject(err);
        }else{
            let text = JSON.parse(data);
            let json = JSON.stringify(text, null, 2);
            resolve(json);
        }
      });
    });
}

let readerPromise = readJSONFile('json.txt');
console.log('Read a file');
readerPromise.then((value) => {
    console.log(value);
}).catch((err) => {
    console.log('Error:', err.message);
});