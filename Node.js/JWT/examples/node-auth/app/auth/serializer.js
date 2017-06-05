const serializer = require('../serializer');

const authSerializer = {};

Object.assign(authSerializer, serializer, {    
    login(resource){
        const {username, isAdmin} = resource;
        return {username, isAdmin};
    }
});
module.exports = authSerializer;