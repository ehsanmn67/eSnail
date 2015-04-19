'use strict';

/* Declate dependencies */
var express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	s3 = require('s3');

/* Create S3 client */
var client = s3.createClient({
	s3Options: {
		accessKeyId: 'AKIAJXYEMJT7W4ZVXWRQ',
    	secretAccessKey: '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'
	}
});

/* Handle user request */
router.post('/', function (req, res) {
	// console.log(__dirname + '/../../client/assets/images/pdf.icon.png');
	console.log(req);
	/* Init upload of client file */
	var uploader = client.uploadFile({
		localFile: __dirname + '/../../client/assets/images/pdf.icon.png',
		s3Params: {
			Bucket: 'esnail',
			Key: 'Sample1'
		}
	});
	/* Log when upload complete */
	uploader.on('end', function() {
		console.log('done uploading');
	});
	/* End request-response cycle */
	res.end();
});

module.exports = router;