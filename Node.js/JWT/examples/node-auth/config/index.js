const Config = require('./config');
const db = require('./db');

module.exports = Object.assign({}, Config, {db});
