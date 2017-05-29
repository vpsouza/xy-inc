'use strict';

const Record = require('../../../../models/record');
const getRecordFromReqBody = require('../get-record-from-req-body');

(function (module) {
	
	module.exports = id => new Promise((resolve, reject) => {
		Record.remove({_id: id}, err => {
			if(err) 
				reject(err.errors.name.message);
			resolve();
		});
	});
}(module));