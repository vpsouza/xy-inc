'use strict';

const Record = require('../../../../models/record');
const getRecordFromReqBody = require('../get-record-from-req-body');

(function (module) {
	
	module.exports = (requestBody, id) => model => new Promise((resolve, reject) => {

		let newModelRecord = getRecordFromReqBody(model, requestBody);
		if(!newModelRecord['_id']){
			newModelRecord['_id'] = id;
		}

		Record.update({ _id: id}, newModelRecord, (err) => {
			if(err) 
				reject(err.errors.name.message);
			resolve();
		});
	});
}(module));