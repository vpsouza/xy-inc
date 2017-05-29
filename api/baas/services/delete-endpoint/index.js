'use strict';

(function (module) {
	const findEndpoint = require('../find-endpoint');
	const deleteRecord = require('./delete-record');
	const findEndpointById = require('../get-endpoint/find-by-id');
	
	module.exports = (body, name, id) => 
		findEndpoint(name)
			.then(endpointInstance => 
				findEndpointById(id)(endpointInstance)
					.then(() => deleteRecord(id)));

}(module));