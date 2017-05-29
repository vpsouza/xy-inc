'use strict';

const getRecord = require('./get-record');

const Record = require('../../../../models/record');
module.exports = endpoint => new Promise((resolve,reject) => {
	Record.find({endpointRef: endpoint._id.toString()}).exec((err,res) => {
		if(err){
			reject(err.errors.name.message);
		}
		resolve(res.map(getRecord(endpoint)));
		//resolve(res);
	});
});