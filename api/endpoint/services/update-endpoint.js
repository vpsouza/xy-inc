'use strict';

const Endpoint = require('../../../models/endpoint');
const restify = require('restify');

module.exports = (id,body) => new Promise((resolve, reject) => {
    if(!body['_id']){
        body['_id'] = id;
    }

    Endpoint.update({ _id: id}, body, (err, raw) => {
        if(err) 
            reject(err);
        raw ? resolve(raw) : reject('record not found');
    })
});