/* eslint-env node, mocha */
var assert = require('assert');
var testEmail = 'user@capstone.com';
var testName = 'user person';
var testAddress = 'user person <user@capstone.com>';
var nameObj = { first: 'user', last: 'person' };

describe('utils', function () {
	describe('clean HTML', function () {
		var cleanHTML = require('../lib/util/cleanHTML');
		var safeString = 'I am the very model of a modern major general.';
		var unsafeString = '<unsafe" OF ".  string>=&#$?|\\';

		it('should return the same string as entered if it was safe', function () {
			var res = cleanHTML(safeString);
			assert.equal(safeString, res);

		});
		it.skip('should replace <>#$/\ and quotations with safe characters', function () {
			var res = cleanHTML(unsafeString);
			console.log(res);
			assert.notEqual(res, unsafeString);
		});
	});

	describe('get engine', function () {
		var getEngine = require('../lib/util/getEngine');
		it('should return the named engine if it is installed', function () {
			var res = getEngine('pug');
			assert(typeof res, 'function');
		});
		it('should return html engine if is requested', function () {
			var res = getEngine('html');
			assert(typeof res, 'function');
		});
		it('should throw if engine cannot be found', function () {
			assert.throws(function () {
				getEngine('watermelon');
			}, Error);
		});
	});

	describe('get transport', function () {
		var getTransport = require('../lib/util/getTransport');

		it('should throw if no transport was found', function () {
			assert.throws(function () {
				getTransport('watermelon');
			}, 'Could not load transport (watermelon)');
		});
	});

	describe('is file', function () {
		it('');
	});

	describe('is truthy', function () {
		it('');
	});

	describe('processAddress', function () {
		var processAddress = require('../lib/util/processAddress');

		it('should set a string provided to both the address and the email', function () {
			var res = processAddress(testEmail);
			assert.equal(res.email, testEmail);
			assert.equal(res.address, testEmail);
		});

		it('should process an object with a name and an email', function () {
			var singlesObj = { email: testEmail, name: testName };
			var res = processAddress(singlesObj);
			assert.equal(res.email, testEmail);
			assert.equal(res.address, testAddress);
		});
		it('should process an object that includes a name object', function () {
			var multiObj = { email: testEmail, name: nameObj };
			var res = processAddress(multiObj);
			assert.equal(res.email, testEmail);
			assert.equal(res.address, testAddress);
			assert.equal(res.firstName, nameObj.first);
			assert.equal(res.lastName, nameObj.last);
		});
		it('should do something if given an empty object');
		// TODO: Behaviours if the object is the wrong shape? Does not include email,
		// name only has name.first etc etc
	});
});

describe('nodemailer transport', function () {
	describe('get recipients', function () {
		// var getRecipients = require('../lib/transports/nodemailer/getRecipients');
		it('');
	});

	describe('index function', function () {
		it('');
	});
});
