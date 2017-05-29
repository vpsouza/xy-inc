const fs = require('fs'),
	  path = require('path');

module.exports = (function() {
	return {
		requireModulesSync: function(modulesPath, filters){
			const modules = {};
			
			fs.readdirSync(modulesPath).forEach(function (file) {
				let filterPassed;
				if(Array.isArray(filters)){
					filterPassed = arrayFunctions.filter((fnObj) => !fnObj(test)).length == 0;
				} else {
					filterPassed = filters(file);
				}

			    if (filterPassed) {
			        modules[file] = require(modulesPath + path.sep + file);
			    }
			});

			return modules;
		},
		jsFilesOnlyFilter: function(file){
			return file.indexOf('.js') != -1;
		},
		dirOnlyFilter: function(file){
			return file.indexOf('.') == -1;
		}
	}
})();