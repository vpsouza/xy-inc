'use strict'

const mongoose = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      createdModified = require('mongoose-createdmodified').createdModifiedPlugin;

const EndpointSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
	properties: {
		type: [new mongoose.Schema({
			name: {
				type: String,
				required: true,
				trim: true,
			},
			type: {
				type: String,
				enum: ['int', 'string', 'decimal', 'date']
			}
		})],
		required: true
	},
}, { minimize: false });


EndpointSchema.plugin(mongooseApiQuery)
EndpointSchema.plugin(createdModified, { index: true })

const Endpoint = mongoose.model('Endpoint', EndpointSchema)
module.exports = Endpoint;