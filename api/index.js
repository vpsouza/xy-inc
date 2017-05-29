'use strict'

const moduleUtil = require('../utils/module-util'),
	path = require('path');

module.exports = (function () {
	return {
		init: function (server) {
			const api = moduleUtil.requireModulesSync(path.resolve('api'), moduleUtil.dirOnlyFilter);
			for (let prop in api) {
				api[prop](server);
			}
		}
	};
})();