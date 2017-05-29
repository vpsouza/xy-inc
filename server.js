const restify = require('restify');
const config = require('./config/config');
const logger = require('./utils/logger');
const API = require('./api');

module.exports = (function () {
	var server = restify.createServer({ //3
		name: config.name,
		version: require('./package.json').version
	});

	server.on('uncaughtException', function (req, res, route, err) {
		logger.error(err.message, {
			event: 'uncaughtException'
		});
		res.send(500, {
			handler: err
		});
	});

	restify.CORS.ALLOW_HEADERS.push('accept');
	restify.CORS.ALLOW_HEADERS.push('sid');
	restify.CORS.ALLOW_HEADERS.push('lang');
	restify.CORS.ALLOW_HEADERS.push('origin');
	restify.CORS.ALLOW_HEADERS.push('withcredentials');
	restify.CORS.ALLOW_HEADERS.push('x-requested-with');

	server.use(restify.CORS({
		origins: ['http://127.0.0.1', 'http://localhost', 'https://platform.easyapps.local', 'http://platform.easyapps.local'], // defaults to ['*']
		credentials: true, // defaults to false
		headers: ['x-foo'], // sets expose-headers
		methods: ['GET', 'PUT', 'DELETE', 'POST', 'OPTIONS']
	}));

	server.use(restify.acceptParser(server.acceptable));
	server.use(restify.queryParser());
	server.use(restify.fullResponse());

	server.use(function (req, res, next) {
		req.rawBody = '';
		req.setEncoding('utf8');
		req.on('data', function (chunk) {
			req.rawBody += chunk;
			try {
				req.body = JSON.parse(req.rawBody);
			} catch (err) {
				logger.error(err);
			}
		});
		req.on('end', function () {
			next();
		});
	});

	/*server.on('after', restify.auditLogger({
		log: logger
	}));*/

	API.init(server);

	global.db = require('./db');

	return server;
})();