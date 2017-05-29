'use strict';

const Endpoint = require('../../../models/endpoint');

module.exports = 
	(name) => new Promise((resolve, reject) => {
		Endpoint.findOne({name: name}, (err,doc) => {
			if(err){
				reject(err.errors.name.message);
			}
			doc ? resolve(doc) : reject({msg: 'Model ' + name + ' not found!'});
		})
	});