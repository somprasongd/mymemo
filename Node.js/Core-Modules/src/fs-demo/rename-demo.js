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