'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');

var s3 = require('s3');

var client = s3.createClient({
	s3Options: {
		accessKeyId: process.env.AWS_ACCESS_KEY,
    	secretAccessKey: process.env.AWS_SECRET_KEY
	}
});

router.post('/', function (req, res) {
	console.log(req);
	res.end();
});

module.exports = router;
