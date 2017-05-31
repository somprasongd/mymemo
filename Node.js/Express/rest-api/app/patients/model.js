const Model = require('../model');

const Patients = {
    table: 'patient',
    permittedAttrs: ['hn', 'firstname', 'lastname', 'gender', 'dob']
};

// สามารถใช้งาน spread properties แทนได้
// see https://babeljs.io/docs/plugins/transform-object-rest-spread/
Object.assign(Patients,
    Model, {
        // other functions in each model
        
    });

module.exports = Patients;