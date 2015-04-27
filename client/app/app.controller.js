'use strict';

angular.module('eSnailApp')
  .controller('AppController', function ($scope, FileUploader, $http) {
  	var uploader = $scope.uploader = new FileUploader({
  		url: '/file/process',
  		autoUpload: true
  	});

  	uploader.onSuccessItem = function(fileItem, res) {
      var filename = res.name.replace(/ /g,'').slice(0, -4),
          fileLength = res.length,
          pageSuffix = ' pgs';
      
      if ( fileLength == 1 ) {
      	pageSuffix = ' pg';
      }

      $scope.$broadcast('pagesAdded', { length: fileLength });

      $('#' + filename).html(res.length + pageSuffix);
    }

    /* Delete temp files if user navigates away from portal */
    // $(window).on("beforeunload", function() {
    //   if ( uploader.queue.length > 0 ) {
    //     return 'All progress will be lost';
    //   }
    // });

    // $(window).on('beforeunload', function() {
    //   $http.delete('/file/removeAll');
    //   uploader.clearQueue();
    // });
});
