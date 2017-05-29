'use strict'

const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connection.on('error', function (err) {
	console.error('Mongoose default connection error: ' + err)
	process.exit(1)
});

mongoose.connection.on('open', function (err) {

	if (err) {
		console.error('Mongoose default connection error: ' + err)
		process.exit(1)
	}

});

module.exports = mongoose.connect(process.env.DB_URL || config.db.url);