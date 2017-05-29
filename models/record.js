'use strict'

const mongoose = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const RecordSchema = new mongoose.Schema({
    endpointRef: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	values: [new mongoose.Schema({
		value:{
			type: String,
			required: true,
			trim: true
		},
		property : {
			type: String,
			required: true,
			trim: true
		}
	})]
}, { minimize: false });

RecordSchema.plugin(mongooseApiQuery)
RecordSchema.plugin(createdModified, { index: true })

const Record = mongoose.model('Record', RecordSchema)

module.exports = Record;