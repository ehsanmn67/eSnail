'use strict';

/* Declare dependencies */
var express = require('express'),
	router = express.Router();

var fs = require('fs');

/* Configure s3 */
var s3 = require('s3'),
	client = s3.createClient({
	s3Options: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
	}
});

/* Handle user request */
router.post('/', function (req, res) {
	var filePath = req.files.file.path; 

	/* Send s3 put object */
	var params = {
			localFile: filePath,
			s3Params: {
				Bucket: 'esnail',
				Key: 'sample',
				ACL: 'public-read'
			}
		},
		uploader = client.uploadFile(params);

	uploader.on('error', function (err) {
		console.log('Unable to upload:', err.stack);
	});

	uploader.on('end', function() {
		console.log("done uploading");

		fs.unlink(filePath, function (err) {
			if (err) throw err;
			console.log('Successfully deleted', req.files.file.name);
		});
	});

	/* End request-response cycle */
	res.end();
});

module.exports = router;