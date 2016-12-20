var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.status(200)
      .send('Hello World!');
});

app.get('/error', (req, res) => {
    res .status(404)
      .send({
        error: "Page not found!"
      });
});

app.get('/users', (req, res) => {
    res .status(200)
      .send([
        {
          name: "A",
          age: 22
        }, {
          name: "B",
          age: 27
        }, {
          name: "C",
          age: 28
        }
      ]);
});

app.listen(3000);

module.exports.app = app;
