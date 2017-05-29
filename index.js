var start_server = require('./start-server'),
	config = require('./config/config');

start_server.start(config).then(
	function () {

	}).catch(function (err) {
		console.error(err);
		process.exit(1);
	}
);
