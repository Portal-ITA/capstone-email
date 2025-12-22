/*
This file sends an email with a test template to an email address.

Usage:

For usage with nodemailer specify your transport config and auth in test.config.js, and then run:
	TO=user@capstonejs.com TEST_NODEMAILER=true node test-send
*/

var Email = require('./index');

var template = process.env.TEMPLATE;
var to = process.env.TO;

var testNodeMailer = process.env.TEST_NODEMAILER === 'true';

if (testNodeMailer) {
	var nodemailerConfig = require('./test.config.js');
}

// default to simple template
if (!template) {
	template = 'simple';
}

var templateOptions = require('./tests/emails/' + template + '/options');
var templatePath = './tests/emails/' + template + '/template.pug';

var toArray = [
	to,
	{ name: 'Test Recipient', email: to.split('@').join('+1@'), vars: { testVar: 'Our test variable' } },
	{ name: { first: 'Test First', last: 'Test Last' }, email: to.split('@').join('+2@') },
];

if (nodemailerConfig) {
	Email.send(
		// template path
		templatePath,
		// Email options
		{
			transport: 'nodemailer',
		},
		// Template locals
		templateOptions,
		// Send options
		{
			to: toArray,
			subject: 'Why hello there! ... from capstone-email ' + Date.now(),
			from: { name: 'Test', email: 'user@capstonejs.com' },
			nodemailerConfig: nodemailerConfig,
		},
		// callback
		function (err, result) {
			if (err) {
				console.error('🤕 Nodemailer test failed with error:\n', err);
			} else {
				console.log('📬 Successfully sent Nodemailer test with result:\n', result);
			}
		}
	);
}
