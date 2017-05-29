'use strict';

const getRecord = require('./get-record');

const Record = require('../../../../models/record');
module.exports = id => endpoint => new Promise((resolve,reject) => {
	Record.findOne({endpointRef: endpoint._id.toString(), _id: id}).exec((err,res) => {
		if(err){
			return reject(err.errors.name.message);
		}
		res ? resolve(getRecord(endpoint)(res)) : reject({msg: 'Record not found for the endpoint ' + endpoint.name});;
	});
});