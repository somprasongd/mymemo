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