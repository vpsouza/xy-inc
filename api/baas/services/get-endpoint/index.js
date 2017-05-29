'use strict';

(function (module) {
	const findEndpoint = require('../find-endpoint');
	const findRecords = require('./find-records');
	const findById = require('./find-by-id');

	module.exports = (body, name, params) =>
		findEndpoint(name)
			.then(
				endpointInstance => {
					return params ? 
						findById(params)(endpointInstance)
						: findRecords(endpointInstance);
				});
}(module));