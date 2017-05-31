const PatientController = require('./controller');

exports.setup = function(router) {
    router
    .get('/:id', PatientController.get)
    .get('/', PatientController.getAll)
    .post('/', PatientController.create)
    .put('/:id', PatientController.update)
    .patch('/:id', PatientController.inactive)
    .delete('/:id', PatientController.destroy)
}