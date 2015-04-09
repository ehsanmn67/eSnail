'use strict';

angular.module('eSnailApp')
  .controller('AppController', function ($scope, FileUploader) {
    $scope.uploader = new FileUploader();
  });
