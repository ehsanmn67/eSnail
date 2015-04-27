'use strict';

angular.module('eSnailApp')
  .controller('AppController', function ($scope, FileUploader) {
  	var uploader = $scope.uploader = new FileUploader({
  		url: '/file/process',
  		autoUpload: true
  	});

  	uploader.onSuccessItem = function(fileItem, res) {
        var filename = res.name.replace(/ /g,'').slice(0, -4),
        	pageSuffix = ' pgs';
        
        if ( res.length == 1 ) {
        	pageSuffix = ' pg';
        }

        $('#' + filename).html(res.length + pageSuffix);
    }
});
