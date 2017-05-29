(function(module){

	var config = require('../config/config.js');
	var Logger = require('bunyan');

	var log = new Logger({
	  name: config.name,
	  streams: [
	  {
	    stream: process.stdout,
	    level: 'debug'
	  }
	  ],
	});
	
	Logger = log;
	module.exports = Logger;

}(module));