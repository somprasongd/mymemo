const Serializer = require('../serializer');

const PatientSerializer = {};

Object.assign(PatientSerializer, Serializer, {
    create(resource){
        const {id, hn} = resource;
        return {id, hn};
    }
});

module.exports = PatientSerializer;