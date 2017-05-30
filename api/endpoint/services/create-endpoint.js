'use strict';

const Endpoint = require('../../../models/endpoint');

module.exports = body => new Promise((resolve, reject) => {
    let model = new Endpoint(body);
    model.save((err) => {
        if(err) 
            reject(err);
        resolve();
    });
});