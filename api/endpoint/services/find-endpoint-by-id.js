'use strict';

const Endpoint = require('../../../models/endpoint');

module.exports = id => new Promise((resolve,reject) => {
    Endpoint.findOne({_id: id}, (err,res) => {
        if(err){
            reject(err.errors.name.message);
        }
        res ? resolve(res) : reject('record not found');
    });
});