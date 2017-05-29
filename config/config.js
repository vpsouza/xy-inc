'use strict'

module.exports = {
    name: 'API',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    base_url: process.env.BASE_URL || 'http://localhost:' + process.env.PORT,
	db: {
		url: 'mongodb://localhost:27017/xy-inc'
	},
    development: {
		username: 'xy-inc',
		password: 'xy-inc',
		database: 'xyinc_dev',
		host: 'localhost',
		dialect: 'postgres',
		port: 5432
	},
	test: {
		username: 'xy-inc',
		password: 'xy-inc',
		database: 'xyinc_test',
		host: 'xyinc-db',
		dialect: 'postgres',
		port: 5432
	},
	production: {
		username: 'xy-inc',
		password: 'xy-inc',
		database: 'xyinc_prod',
		host: 'xyinc-db',
		dialect: 'postgres',
		port: 5432
	}
}