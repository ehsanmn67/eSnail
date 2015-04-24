'use strict';

angular.module('eSnailApp')
    .controller('MainController', function ($scope, $http, $timeout) {
        
        $('.stamp-placeholder')
            .bind('mouseenter', showStampOptions)
            .bind('mouseleave', hideStampOptions);

        $('.stamp-options-container')
            .on('mouseenter', function() {
                $(this).stop().fadeIn();
            })
            .on('mouseleave', function() {
                $(this).stop().fadeOut();
            });

        $('#stamp-container').on('click', '.stamp-image', function() {
            var type = $(this).attr('data-type');

            $('.stamp-options-container').stop().fadeOut();
            $('.stamp-placeholder-text').html('');
            $('.stamp-selected-image').attr('src', '/assets/images/ironman_stamp.png');
            $('.stamp-selected-image').attr('data-type', type);
        });

        function showStampOptions(e) {
            $('.stamp-options-container').stop().fadeIn();
        }

        function hideStampOptions(e) {
            $('.stamp-options-container').stop().fadeOut();
        }

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
            parseEnvelope();
        };

        $scope.preparePayment = function () {
            $scope.status.thirdOpen = true;

            $('.flipper').addClass('flip');
            // $('.envelope').removeClass('open');
            $('.envelope .top').removeClass('open');
            $('.envelope .paper').removeClass('open');
            formatEnvelope();
        };

        var placeholders = [
            {
                className: 'name-input',
                displayName: 'Full Name'
            },
            {
                className: 'street-input',
                displayName: 'Street'
            },
            {
                className: 'city-input',
                displayName: 'City'
            },
            {
                className: 'zip-input',
                displayName: 'Zip Code'
            }
        ];

        function formatEnvelope() {
            /* Hide input styles */
            $('.address-form-control').addClass('hide-appearance');
            $('.state-address').addClass('hide-appearance');
            $('.state-address').css('border-bottom', 'none');

            /* Disable inputs */
            $('.address-form-control')
                .attr('placeholder', '')
                .attr('disabled', true);
            $('.state-address').attr('disabled', true);

            /* Remove handlers from stamp container */
            $('.stamp-placeholder').unbind('mouseenter');
            $('.stamp-placeholder').unbind('mouseleave');
            $('.stamp-placeholder').css('cursor', 'auto');
        }

        function parseEnvelope() {
            /* Show input styles */
            $('.address-form-control').removeClass('hide-appearance');
            $('.state-address').removeClass('hide-appearance');
            $('.state-address').css('border-bottom', '1px dotted #ced2d8');

            /* Enable inputs */
            $('.address-form-control').each(function() {
                for (var i = 0; i < placeholders.length; i++) {
                    if ( $(this).hasClass( placeholders[i].className ) ) {
                        $(this).attr('placeholder', placeholders[i].displayName);
                    }
                }
                $(this).attr('disabled', false);
            });
            $('.state-address').attr('disabled', false);
            $('#user-name').focus();

            /* Attach handlers from stamp container */
            $('.stamp-placeholder')
                .bind('mouseenter', showStampOptions)
                .bind('mouseleave', hideStampOptions);
            $('.stamp-placeholder').css('cursor', 'pointer');
        }

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
