'use strict';

/* Declare dependencies */
var express = require('express'),
	router = express.Router();


var fs = require('fs');

var AWS = require('aws-sdk');
AWS.config.region = 'us-west-1';

/* Handle user request */
router.post('/', function (req, res) {
	// var s3 = new AWS.S3();
	if (req.busboy) {
	    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
	    	console.log(fieldname);
	    	console.log(file);
	    	console.log(filename);
	    });
	}
	// console.log(req.files);
	// var options = {
	// 	ACL: 'public-read',
	// 	Bucket: 'esnail',
	// 	Key: 'nativeAWS',
	// 	Body: buffer,
	// 	ContentType: 'application/pdf'
	// };


	// s3.upload(options, function (err, data) {
	// 	console.log(err, data);
	// });

	// s3.putObject(options, function (err, data) {
		// console.log(data);
	// });

	// var body = fs.createReadStream(buffer).pipe(zlib.createGzip());
	// var s3obj = new AWS.S3({params: {Bucket: 'esnail', Key: 'aws-sdk'}});
	// s3obj.upload({Body: body}).
		// on('httpUploadProgress', function(evt) { console.log(evt); }).
		// send(function(err, data) { console.log(err, data) });
	// newS3.put('/newS3File', buffer, function (err, s3response, body) {
	// 	console.log('ERR', err);
	// 	console.log('RESPONSE', s3response);
	// 	console.log('BODY', body);
	// });
	// console.log(__dirname + '/../../client/assets/images/pdf.icon.png');
		// localFile: __dirname + '/../../client/assets/images/pdf.icon.png',
	/* Init upload of client file */
	// var uploader = client.uploadFile({
	// 	s3Params: {
	// 		Bucket: 'esnail',
	// 		Key: 'Sample2',
	// 		Body: buffer
	// 	}
	// });
	/* Log when upload complete */
	// uploader.on('end', function() {
		// console.log('done uploading');
	// });
	/* End request-response cycle */
	res.end();
});

module.exports = router;