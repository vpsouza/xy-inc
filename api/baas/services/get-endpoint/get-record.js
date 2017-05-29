'use strict';

const parseValue = require('./parse-value');

module.exports = endpointInstance => recordInstance => {
	let newInstance = {_id: recordInstance._id.toString()};
	recordInstance.values.forEach((value) => {
		newInstance[value.property] = parseValue(value, endpointInstance);
	});
	return newInstance;
};