const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');

console.log(app.get('view engine'));
// app.use เป็นการสร้าง middleware
// ใช้ middleware สร้าง public folder
app.use(express.static(__dirname + '/public'));

app.get('/about', (req, res) => {
  res.render('about.hbs');
});

app.listen(3000, () => {
  console.log('Server is up on port 3000!');
});
