'use strict';

const Endpoint = require('../../../models/endpoint');

module.exports = (query) => new Promise((resolve,reject) => {
    Endpoint.find(query || {}).exec((err, res) => {
        if(err){
            reject(err);
        }
        resolve(res);
    })
});