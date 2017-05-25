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