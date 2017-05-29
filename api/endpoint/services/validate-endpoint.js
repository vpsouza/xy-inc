'use strict';

const restify = require('restify');
const Endpoint = require('../../../models/endpoint');

module.exports = (req,res,next) => {
    if(!req.body){
        let err = 'Invalid request data';
        res.send(new restify.BadRequestError(err));
        return next(err);
    }

    let error = new Endpoint(req.body).validateSync();
    if(error){
        res.send(new restify.BadRequestError(error.errors));
        return next(error.errors);
    }

    return next();
};