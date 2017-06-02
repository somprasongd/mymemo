const Serializer = require('../serializer');

const UserSerializer = {};

Object.assign(UserSerializer, Serializer, {
    getAll(resources){        
        return resources.map(resource => this.serializer(resource));
    },
    get(resource){
        return this.serializer(resource);
    },
    create(resource){
        return this.serializer(resource);
    },
    update(resource){
        return this.serializer(resource);
    }, 
    serializer(resource){
        const {_id, username, isAdmin} = resource;
        return {_id, username, isAdmin};
    }
});
module.exports = UserSerializer;