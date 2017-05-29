var server = require('./server'),
	logger = require('./utils/logger');

module.exports = (function () {
	process.on('error', function () {
		logger.error(arguments);
	});

	var server_module = {
		start: function (config) { //2
			return new Promise((resolve, reject) => {
				try {
					server.listen(config.port || 8080, function () { //6
						logger.info('Server ' + server.name + ' started, listening on ' + config.port);
						resolve({
							name: server.name,
							url: 'null'
						});
					});

				} catch (e) {
					logger.error('Failure to start server');
					reject(e);
				}
			});
		}
	};

	return server_module;
})();