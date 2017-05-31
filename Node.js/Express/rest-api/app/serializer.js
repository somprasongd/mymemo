const Serializer = {
    for(method, resource){
        return this[method](resource);
    }
}

module.exports = Serializer;