'use strict';

angular.module('eSnailApp')
    .controller('MainController', function ($scope, $http, $timeout) {
        
        $('.stamp-options-container')
            .on('mouseenter', function() {
                $(this).stop().fadeIn();
            })
            .on('mouseleave', function() {
                $(this).stop().fadeOut();
            });

        $('.stamp-placeholder')
            .on('mouseenter', function() {
                $('.stamp-options-container').stop().fadeIn();
            })
            .on('mouseleave', function() {
                $('.stamp-options-container').stop().fadeOut();
            });

        $('#stamp-container').on('click', '.stamp-image', function() {
            var type = $(this).attr('data-type');

            $('.stamp-options-container').stop().fadeOut();
            $('.stamp-placeholder-text').html('');
            $('.stamp-selected-image').attr('src', '/assets/images/ironman_stamp.png');
            $('.stamp-selected-image').attr('data-type', type);
        });


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
