'use strict';

const Endpoint = require('../../../models/endpoint');

module.exports = id => new Promise((resolve,reject) => {
    Endpoint.remove({_id: id}, err => {
        if(err){
            reject(err);
        }
        resolve();
    })
});