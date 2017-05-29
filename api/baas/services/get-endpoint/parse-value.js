'use strict';
const moment = require('moment');

const parsers = {
	'int': (value) => parseInt(value),
	'string': (value) => value,
	'decimal': (value) => parseFloat(value), 
	'date': (value) => moment(value)
};

module.exports = (valueInstance, endpointInstance) => {
	let propertyDef = endpointInstance.properties.filter(prop => {
		return prop.name === valueInstance.property;
	})[0];
	
	return parsers[propertyDef.type](valueInstance.value);
};