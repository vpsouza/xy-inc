'use strict';

module.exports = (endpointInstance, body) => {
	const isPropertyDefined = propName => endpointInstance.properties.filter(prop => prop.name == propName).length > 0;

    let newInstance = {
        'endpointRef': endpointInstance._id,
        values: Object.keys(body).filter(elm => elm !== '_id' && isPropertyDefined(elm)).map(key => ({
            property: key,
            value: body[key]
        }))
    };
    return newInstance;
};