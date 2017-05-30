'use strict';

const restify = require('restify');
const Endpoint = require('../../../models/endpoint');

module.exports = (req,res,next) => {
    if(!req.body){
        let err = 'Invalid request data';
		//res.send(new restify.BadRequestError(err));
        return next(err);
    }

    let bodyCloned = Object.assign({}, req.body);

    let error = new Endpoint(bodyCloned).validateSync();
    if(error){
		res.send(new restify.BadRequestError({message: 'Validation Error - ' + error._message}));
        return next(error);
    }

    return next();
};