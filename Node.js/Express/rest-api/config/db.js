const config = require('./config');
// Loading and initializing the library:
const pgp = require('pg-promise')(config.pgpOptions);

// Creating a new database instance from the connection details:
const db = pgp(config.pgpConnection);

// // When exiting your application, you can optionally call pgp.end
// process.on('SIGINT', function () {
//     pgp.end(); // terminate the database connection pool
//     process.exit(0);
// });

// Exporting the database object for shared use:
module.exports = db;

// exports.setConnection = app => {
//     app.use((req, res, next) => {
//         req.db = db;
//         next();
//     });
// }