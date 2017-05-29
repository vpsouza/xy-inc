'use strict'

global.db = require('../db');
let mongoose = require("mongoose");
let Endpoint = require('../models/endpoint');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server;
let expect = chai.expect;
let should = chai.should();

chai.use(chaiHttp);

describe('Endpoint api test', () => {

	beforeEach((done) => {
		server = require('../server.js');
		Endpoint.remove({}, (err) => done(err));
	});

	describe('GET /endpoints', () => {
		
		it('GET /endpoints => should list all endpoints definitions', (done) => {
			chai.request(server).get('/endpoints')
				.end((err,res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.be.a('array');
					expect(res.body.length).to.equal(0);
					done(err);
				});
		});
	});

	describe('POST /endpoints', () => {
		it('POST /endpoints => should not create a duplicated endpoint definition', (done) => {
			let endponintBody = {
				"name": "toDuplicate",
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
					}
				]
			};

			new Endpoint(endponintBody).save(err => chai.request(server)
				.post('/endpoints')
				.send(endponintBody)
				.end((err,res) => {
					expect(res.status).to.equal(409);
					//expect(res.body).to.be.empty();
					done();
				}));
		});

		it('POST /endpoints => should create a valid endpoint definition', (done) => {
			let endponintBody = {
				"name": "newEndpoint",
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
					}
				]
			};
			chai.request(server)
				.post('/endpoints')
				.send(endponintBody)			
				.end((err,res) => {
					expect(res.status).to.equal(201);
					//res.body.should.be.empty();
					done();
				});
		});
	});

	describe('PUT /endpoints', () => {
		it('PUT /endpoints => should not update an endpoint definition that doesn\'t exists', (done) => {
			let endponintBody = {
				"name": "paranaue",
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
					}
				]
			};

			chai.request(server)
				.put('/endpoints/592b8ca42dd1ea21d4999999')
				.send(endponintBody)
				.end((err,res) => {
					expect(res.status).to.equal(500);
					//expect(res.body).to.be.empty();
					done();
				});
		});

		it('PUT /endpoints => should update a valid endpoint definition', (done) => {
			let endponintBody = {
				"name": "newEndpoint",
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
					}
				]
			};

			new Endpoint(endponintBody).save((err, endpoint) => {
				endpoint.name = 'newName';
				chai.request(server)
				.put('/endpoints/' + endpoint._id.toString())
				.send(endpoint)
				.end((err,res) => {
					expect(res.status).to.equal(201);
					//expect(res.body).to.be.empty();
					done();
				});
			});
		});
	})

	describe('DELETE /endpoints', () => {
		it('DELETE /endpoints => should delete a valid endpoint definition', (done) => {
			let endponintBody = {
				"name": "newEndpoint",
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
					}
				]
			};

			new Endpoint(endponintBody).save((err, endpoint) => {
				endpoint.name = 'newName';
				chai.request(server)
				.del('/endpoints/' + endpoint._id.toString())
				.send()
				.end((err,res) => {
					expect(res.status).to.equal(204);
					//expect(res.body).to.be.empty();
					done();
				});
			});
		});
	})
});

