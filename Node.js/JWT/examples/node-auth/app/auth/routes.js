const controller = require('./controller');

exports.setup = function(router) {
    router.post('/', controller.login);
}