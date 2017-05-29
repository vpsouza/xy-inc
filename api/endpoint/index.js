module.exports = (function() {
	'use strict';

	const restify = require('restify');

	const createEndpoint = require('./services/create-endpoint');
	const updateEndpoint = require('./services/update-endpoint');
	const deleteEndpoint = require('./services/delete-endpoint');
	const queryEndpoint = require('./services/query-endpoint');
	const findEndpointById = require('./services/find-endpoint-by-id');
	const validateEndpoint = require('./services/validate-endpoint');
	const validateExistingEndpoint = newModel => res => new Promise((resolve, reject) => {
		if(!res || res.length === 0){
			return resolve(createEndpoint(newModel));
		} else {
			return reject(new restify.ConflictError('Sorry, the model ' + newModel.name + ' already exists.'));
			//return reject(new restify.InternalServerError('Sorry, the model ' + newModel.name + ' already exists.'));
		}
	});

	return function(server){
		server.post('/endpoints', validateEndpoint, (req,res,next) => {
			queryEndpoint({name: req.body['name']})
				.then(validateExistingEndpoint(req.body))
				.then(() => res.send(201))
				.catch(err => res.send(err));
		});

		server.put('/endpoints/:id', validateEndpoint, (req,res,next) => {
			findEndpointById(req.params.id)
				.then(() => {
					return updateEndpoint(req.params.id, req.body);
				})
				.then(() => res.send(201))
				.catch(err => res.send(new restify.InternalServerError(err)));
		});

		server.del('/endpoints/:id', (req,res,next) => {
			findEndpointById(req.params.id)
				.then(() => {
					return deleteEndpoint(req.params.id);
				})
				.then(() => res.send(204))
				.catch(err => res.send(new restify.InternalServerError(err)));
		});

		server.get('/endpoints', (req,res,next) => {
			queryEndpoint()
				.then(result => res.send(200, result))
				.catch(err => res.send(new restify.InternalServerError(err)));
		});

		server.get('/endpoints/:id', (req,res,next) => {
			findEndpointById(req.params.id)
				.then(result => res.send(200, result))
				.catch(err => res.send(new restify.InternalServerError(err)));
		} );
	};
})();