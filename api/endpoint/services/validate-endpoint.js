'use strict';

const restify = require('restify');
const Endpoint = require('../../../models/endpoint');

module.exports = (req,res,next) => {
    if(!req.body){
        let err = 'Invalid request data';
        return next(err);
    }

    let bodyCloned = Object.assign({}, req.body);

    if(!bodyCloned['_id']){
        bodyCloned['_id'] = '592c7f26f0ffe42480bab9c9';
    }
    let error = new Endpoint(bodyCloned).validateSync();
    if(error){
        return next(error.errors);
    }

    return next();
};