'use strict';

const Record = require('../../../../models/record');
const getRecordFromReqBody = require('../get-record-from-req-body');

(function (module) {
	
	module.exports = requestBody => endpointInstance => new Promise((resolve, reject) => {
		let newRecord = new Record(getRecordFromReqBody(endpointInstance, requestBody));
		newRecord.save((err) => {
			if(err) 
				reject(err);
			resolve();
		});
	});
}(module));