const UserController = require('./controller');

exports.setup = function(router) {
    router
    .get('/:id', UserController.get)
    .get('/', UserController.getAll)
    .post('/', UserController.create)
    .put('/:id', UserController.update)
    .delete('/:id', UserController.destroy)
}