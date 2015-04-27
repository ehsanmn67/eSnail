'use strict';

/* Declare dependencies */
var express = require('express'),
	router = express.Router();

var fs = require('fs');
var pdfutils = require('pdfutils').pdfutils;

/* Configure s3 */
var s3 = require('s3'),
	client = s3.createClient({
	s3Options: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
	}
});

var files = [];
/* Request handlers */
router.post('/process', function (req, res) {
	var currentFile = req.files.file,
		filePath = currentFile.path,
		file;

	/* Determine number of pages in PDF document */
	pdfutils(filePath, function (err, doc) {
		file = {
			name  : currentFile.name,
			length: doc.length,
			path  : filePath 
		};
		files.push(file);
		/* End request-response cycle */
		res.json(file);
	});
});

router.delete('/process', function (req, res) {
	deleteTempFiles();
});

router.post('/upload', function (req, res) {
	/* Send S3 put object for each file */
	for (var i = 0; i < files.length; i++) {
		var currentFile = files[i];

		var params = {
			localFile: currentFile.path,
			s3Params: {
				Bucket: 'esnail',
				Key: currentFile.name,
				ACL: 'public-read'
			}
		};
		
		var uploader = client.uploadFile(params);

		/* If last file, then delete all files in /tempUploads */
		if ( i == files.length - 1 ) {
			uploader.on('end', function() {
				deleteTempFiles();
			});
		}
	}
	/* End request-response cycle */
	res.end();
});

function deleteTempFiles() {
	for (var i = 0; i < files.length; i++) {
		fs.unlink(files[i].path, function (err) {
			if (err) throw err;
		});
	}
}

module.exports = router;