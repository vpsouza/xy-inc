'use strict';

(function (module) {
	const findEndpoint = require('../find-endpoint');
	const createRecord = require('./create-record');
	
	module.exports = (body, name) => findEndpoint(name).then(createRecord(body));

}(module));