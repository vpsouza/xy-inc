'use strict'

global.db = require('../db');
let mongoose = require("mongoose");
let Endpoint = require('../models/endpoint');
let Record = require('../models/record');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server;
let expect = chai.expect;
let should = chai.should();

let endpointName = "endpoint" + (Math.random() * 100);
let endpointId;

chai.use(chaiHttp);

describe('BaaS api test', () => {

	beforeEach(done => {
		server = require('../server.js');

		Record.remove({}, (err) => {
			if(err){
				return done(err);
			}

			Endpoint.remove({}, (err) => {
				if(err) {
					return done(err);
				}
				
				let endponintBody = {
					"name": endpointName,
					"properties": [
						{
							"name": "tag",
							"type": "string"
						},
						{
							"name": "quantity",
							"type": "int"
						},
						{
							"name": "price",
							"type": "decimal"
						},
						{
							"name": "dateadd",
							"type": "date"
						}
					]
				};

				new Endpoint(endponintBody).save((err,raw) => {
					if(err) {
						return done(err);
					}

					endpointId = raw._id.toString();
					done(err);
				});
			});
		});
		
	});

	describe('GET /api/' + endpointName, () => {
		it('GET /api/' + endpointName + ' => should list all records for the ' + endpointName + ' endpoint defined', (done) => {
			chai.request(server)
				.get('/api/' + endpointName)
				.end((err,res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.be.a('array');
					expect(res.body.length).to.equal(0);
					done(err);
				});
		});
	});

	describe('POST /api/' + endpointName, () => {
		it('POST /api/' + endpointName + ' => should create a valid record for the ' + endpointName + ' definition', (done) => {
			chai.request(server)
				.post('/api/' + endpointName)
				.send({
					"tag": "mytag",
					"quantity": 27,
					"price": 48.7,
					"dateadd": "2017-05-29"
				})
				.end((err,res) => {
					expect(res.status).to.equal(201);
					done(err);
				});
		});
	});

	describe('PUT /api/' + endpointName, () => {
		
		it('PUT /api/' + endpointName + ' => should update a valid record for the ' + endpointName + ' definition', (done) => {
			let recordBody = {
				endpointRef: endpointId,
				values: [
					{
						"property": "tag",
						"value": "string"
					},
					{
						"property": "quantity",
						"value": 1
					},
					{
						"property": "price",
						"value": 2.4
					},
					{
						"property": "dateadd",
						"value": "2017-05-29"
					}
				]
			};

			new Record(recordBody).save((err, record) => {
				record.values[0].value = "new Value";

				chai.request(server)
					.put('/api/' + endpointName + '/' + record._id.toString())
					.send(record)
					.end((err,res) => {
						expect(res.status).to.equal(201);
						done(err);
					});
			});
		});
	});

	describe('DELETE /api/' + endpointName, () => {
		
		it('DELETE /api/' + endpointName + ' => should delete a valid record for the ' + endpointName + ' definition', (done) => {
			let recordBody = {
				endpointRef: endpointId,
				values: [
					{
						"property": "tag",
						"value": "string"
					},
					{
						"property": "quantity",
						"value": 1
					},
					{
						"property": "price",
						"value": 2.4
					},
					{
						"property": "dateadd",
						"value": "2017-05-29"
					}
				]
			};

			new Record(recordBody).save((err, record) => {
				record.values[0].value = "new Value";

				chai.request(server)
					.del('/api/' + endpointName + '/' + record._id.toString())
					.send()
					.end((err,res) => {
						expect(res.status).to.equal(201);
						done(err);
					});
			});
		});
	});
});

