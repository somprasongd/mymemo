const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config'); // auto import ./config/index.js
const routes = require('./app/routes');

const app = express();
const PORT = config.port;

// set enviroments
app.use(logger('dev'));
// ให้ body-parser แปลง body message เป็น json
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// setup routes
routes.setupRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send({
	  status: 404,
	  message: `${req.method} ${req.url} Not Found`
  });
});

// ระบุ port ของ web server 
app.listen(PORT, err => {
	if (err) {
		console.log('Start server error:', err.message);
	} else {
		console.log('Server is runnig at http://localhost:' + PORT);
	}
});