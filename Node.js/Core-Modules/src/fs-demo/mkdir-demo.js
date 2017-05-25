const fs = require('fs');

fs.mkdir('myfolder', (err) => {
    if(err){
        console.log('Error:', err.message);
    }
    console.log('Create directory successfully.');
});