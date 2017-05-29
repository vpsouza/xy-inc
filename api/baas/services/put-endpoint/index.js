'use strict';

(function (module) {
	const findEndpoint = require('../find-endpoint');
	const updateRecord = require('./update-record');
	const findById = require('../get-endpoint/find-by-id');
	
	module.exports = (body, name, id) => 
		findEndpoint(name).then(
			modelInstance => findById(id)(modelInstance).then(() => {
				return updateRecord(body, id)(modelInstance);
			}));

}(module));