const path = require('path');

// หาตำแหน่งไฟล์
console.log(`resolve: ${path.resolve('path-demo.js')}`);

console.log(`base name or filename: ${path.basename('path-demo.js')}`);

console.log(`extension name: ${path.extname('path-demo.js')}`);