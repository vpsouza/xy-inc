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

	server.opts(/.*/, function (req,res,next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
		res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
		res.send(200);
		return next();
	});

	restify.CORS.ALLOW_HEADERS.push('accept');
	restify.CORS.ALLOW_HEADERS.push('sid');
	restify.CORS.ALLOW_HEADERS.push('lang');
	restify.CORS.ALLOW_HEADERS.push('origin');
	restify.CORS.ALLOW_HEADERS.push('withcredentials');
	restify.CORS.ALLOW_HEADERS.push('x-requested-with');
	server.use(restify.CORS());

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

	server.on('after', restify.auditLogger({
		log: logger
	}));

	API.init(server);

	global.db = require('./db');

	return server;
})();