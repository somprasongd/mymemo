const config = require('./config');
const mongoose = require('mongoose');
const fs = require('fs');

// Use native promises
mongoose.Promise = global.Promise;

const setupModels = function (APP_DIR) {
    const features = fs.readdirSync(APP_DIR).filter(
        file => fs.statSync(`${APP_DIR}/${file}`).isDirectory()
    );

    features.forEach(feature => {
        if (fs.existsSync(`${APP_DIR}/${feature}/model.js`)) {
            console.log(`${APP_DIR}/${feature}/model.js`);
            require(`${APP_DIR}/${feature}/model.js`);
        }
        
    });
}
const DB = {
    async connect(APP_DIR) {
        mongoose.set('debug', config.debug);        
        // Catching the events
        mongoose.connection.on('connected', function () {
            console.log('Mongoose connected');
        });
        mongoose.connection.on('error', function (err) {
            console.log('Mongoose connection error: ' + err);
        });
        mongoose.connection.on('disconnected', function () {
            console.log('Mongoose disconnected');
        });
        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                console.log('Mongoose disconnected through app termination');
                process.exit(0);
            });
        });
        // load model
        // ตัวอย่าง require('model.js');
        setupModels(APP_DIR);
        // connect to mongodb
        console.log('Connecting to mongodb via mongoose.');
        mongoose.connect(config.mongoUri);        
    }
};

module.exports = DB;