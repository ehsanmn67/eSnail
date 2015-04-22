'use strict';

angular.module('eSnailApp')
    .controller('MainController', function ($scope, $http, $timeout) {
        $scope.status = {
            firstOpen: false,
            secondOpen: false,
            thirdOpen: false
        };

        $scope.initProcess = function() {
            $scope.status.firstOpen = true;

            // $('.envelope').addClass('open');
            $('.envelope .top').addClass('open');
            $('.envelope .paper').addClass('open');
        };

        $scope.prepareEnvelopeDocuments = function() {
            $scope.status.firstOpen = true;

            $('.flipper').removeClass('flip');
            // $('.envelope').addClass('open');
            $('.envelope .top').addClass('open');
            $('.envelope .paper').addClass('open');
        };

        $scope.prepareEnvelopeAddress = function() {
            $scope.status.secondOpen = true;

            $('.flipper').addClass('flip');
            // $('.envelope').removeClass('open');
            $('.envelope .top').removeClass('open');
            $('.envelope .paper').removeClass('open');
            $('#user-name').focus();
        };

        $scope.preparePayment = function () {
            $scope.status.thirdOpen = true;

            $('.flipper').addClass('flip');
            // $('.envelope').removeClass('open');
            $('.envelope .top').removeClass('open');
            $('.envelope .paper').removeClass('open');
            $('#user-name').focus();
        };

        // $scope.awesomeThings = [];
        // $http.get('/api/things').success(function(awesomeThings) {
            // $scope.awesomeThings = awesomeThings;
        // });
                
        // $scope.addThing = function() {
        //     if($scope.newThing === '') {
        //         return;
        //     }
        //     $http.post('/api/things', { name: $scope.newThing });
        //     $scope.newThing = '';
        // };

        // $scope.deleteThing = function(thing) {
        //     $http.delete('/api/things/' + thing._id);
        // };

    });
