const UserController = require('./controller');

exports.setup = function(router) {
    router
    .get('/', UserController.getAll)
}