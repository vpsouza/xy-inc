module.exports = (function() {
	'use strict';

	const regexp = /^(\/api\/)([a-zA-Z0-9_\.~-]+)\/?(.*)/;
	
	const handleApi = (service, httpStatusSuccess, httpStatusErr) => (req,res,next) => {

		service(req.body, req.params[1], req.params[2])
			.then(result => {
				res.send(httpStatusSuccess, result);
			})
			.catch(err => {
				res.send(httpStatusErr, err);
			});
	};
	
	return function(server){
		
		server.get(regexp, handleApi( require('./services/get-endpoint'), 200, 500 ) );
		server.post(regexp, handleApi( require('./services/post-endpoint'), 201, 500 ) );
		server.put(regexp, handleApi( require('./services/put-endpoint'), 201, 500 ) );
		server.del(regexp, handleApi( require('./services/delete-endpoint'), 201, 500 ) );
	};
})();