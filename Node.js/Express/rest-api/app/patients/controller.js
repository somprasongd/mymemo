const PatientModel = require('./model');
const PatientSerializer = require('./serializer');

const PatientController = {
    getAll(req, res) {
        PatientModel.findAll()
        .then(patients => {
            res.send({patients});
        })
        .catch(err => {
            res.status(500).send({err: err.message});
        });
    },
    get(req, res) {
        PatientModel.find(req.params.id)
        .then(patient => {
            res.send({patient});
        })
        .catch(err => {
            res.status(500).send({err: err.message});
        });
    }, 
    create(req, res) {
        PatientModel.create(req.body)
        .then(patient => {
            res.send({patient: PatientSerializer.for('create', patient)});
        })
        .catch(err => {
            res.status(500).send({err: err.message});
        });
    }, 
    update(req, res) {
        PatientModel.update(req.params.id, req.body)
        .then(patient => {
            res.send({patient});
        })
        .catch(err => {
            res.status(500).send({err: err.message});
        });
    },
    inactive(req, res) {
        PatientModel.inactive(req.params.id)
        .then(patient => {
            res.status(204).send();
        })
        .catch(err => {
            res.status(500).send({err: err.message});
        });
    },
    destroy(req, res) {
        PatientModel.destroy(req.params.id)
        .then(patient => {
            res.status(204).send();
        })
        .catch(err => {
            res.status(500).send({err: err.message});
        });
    }
}

module.exports = PatientController;