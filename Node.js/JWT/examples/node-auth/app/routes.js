const express = require('express');
const fs = require('fs');

// set routes ให้ไปอ่านจากโฟลเดอร์ app
exports.setupRoutes = function (app) {
	const APP_DIR = __dirname;
	const features = fs.readdirSync(APP_DIR).filter(
		file => fs.statSync(`${APP_DIR}/${file}`).isDirectory()
	);

	features.forEach(feature => {
		const router = express.Router();
		const routes = require(`${APP_DIR}/${feature}/routes.js`);

		routes.setup(router);
		app.use(`/${feature}`, router);
	});
}