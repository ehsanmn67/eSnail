'use strict';

angular.module('eSnailApp')
    .controller('MainController', function ($scope, $http, $timeout) {
        /* Local variables/functions */
        var handler = StripeCheckout.configure({
            key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
            image: '/assets/images/ironman_stamp.png',
            token: function(token) {
                // Use the token to create the charge with a server-side script.
                // You can access the token ID with `token.id`
            }
        });

        var totalCost = 349;

        function formatEnvelope() {
            /* Hide input styles */
            $('.address-form-control').addClass('hide-appearance');
            $('.state-address').addClass('hide-appearance');
            $('.state-address').css('border-bottom', 'none');
            $('.address-header').css('opacity', 0);

            /* Disable inputs */
            $('.address-form-control').each(function() {
                $(this).data('placeholder', $(this).attr('placeholder'));
                $(this).attr('placeholder', '');
                $('.state-address').attr('disabled', true);
            });

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
            $('.address-header').css('opacity', 1);

            /* Enable inputs */
            $('.address-form-control').each(function() {
                $(this).attr('placeholder', $(this).data('placeholder'));
                $(this).attr('disabled', false);
            });

            $('.state-address').attr('disabled', false);
            $('#user-name').focus();

            /* TEMP */
            /* Attach handlers from stamp container */
            // $('.stamp-placeholder')
            //     .bind('mouseenter', showStampOptions)
            //     .bind('mouseleave', hideStampOptions);
            $('.stamp-placeholder').css('cursor', 'pointer');
        }

        function showStampOptions(e) {
            $('.stamp-options-container').stop().fadeIn();
        }

        function hideStampOptions(e) {
            $('.stamp-options-container').stop().fadeOut();
        }

        /* jQuery Handlers */

        /* TEMP */
        // $('.stamp-placeholder')
            // .bind('mouseenter', showStampOptions)
            // .bind('mouseleave', hideStampOptions);

        /* TEMP */
        // $('.stamp-options-container')
        //     .on('mouseenter', function() {
        //         $(this).stop().fadeIn();
        //     })
        //     .on('mouseleave', function() {
        //         $(this).stop().fadeOut();
        //     });

        $(document).on('scroll', onScroll);

        $(window).on('scroll', function() {
            var windowScroll = $(window).scrollTop();

            if ( windowScroll >= 1 ) {
                $('.navbar').addClass('scrolling');
            } else {
                $('.navbar').removeClass('scrolling');
            }
        })

        function onScroll (e){
            var scrollPos = $(document).scrollTop() + 100;
            $('.navbar-nav a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.data('ref'));
                if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() + 100 > scrollPos) {
                    $('.navbar-nav li a').removeClass('active');
                    currLink.addClass('active');
                }
                else{
                    currLink.removeClass('active');
                }
            });
        }


        $('input').focus(function(){
           $(this).data('placeholder', $(this).attr('placeholder'));
           $(this).attr('placeholder', '');
        });

        $('input').blur(function(){
           $(this).attr('placeholder', $(this).data('placeholder'));
        });

        $('#stamp-container').on('click', '.stamp-image', function() {
            var type = $(this).attr('data-type');

            $('.stamp-options-container').stop().fadeOut();
            $('.stamp-placeholder-text').html('');
            $('.stamp-selected-image').attr('src', '/assets/images/ironman_stamp.png');
            $('.stamp-selected-image').attr('data-type', type);
        });

        $(window).on('popstate', function() {
            handler.close();
        });

        /* $scope handlers/properties/methods */
        $scope.$on('pagesAdded', function (e, pageData) {
            totalCost += ( pageData.length * 39 );
        });

        $scope.scrollTo = function(id) {
            $('html, body').stop().animate({
                scrollTop: $('#' + id).offset().top - 100
            }, 500, 'swing');
        };

        function prepareEnvelopeDocuments() {
            $('.flipper').removeClass('flip');
        };

        function prepareEnvelopeAddress() {
            $('.flipper').addClass('flip');
            parseEnvelope();
        };

        function preparePayment() {
            $('.flipper').addClass('flip');
            formatEnvelope();
        };

        $('#steps').slick({
            dots: true,
            infinite: false
        });

        $('#steps').on('beforeChange', function (e, slick, currentSlide, nextSlide){

            switch( nextSlide ) {
                case 0:
                    prepareEnvelopeDocuments();
                    $('.pay-container').css('display', 'none');
                    break; 
                case 1: 
                    prepareEnvelopeAddress();
                    $('.pay-container').css('display', 'none');
                    break; 
                case 2:
                    preparePayment();
                    $('.pay-container').fadeIn();
                    break;
                default:
                    prepareEnvelopeDocuments();
                    $('.pay-container').css('display', 'none');
                    break;
            }

        });

        $('#steps').on('click', '#stripe-checkout', function() {
            handler.open({
                name: 'eSnail',
                description: '2 widgets',
                amount: totalCost
            });
        });

        $scope.stripeCheckout = function() {
            handler.open({
                name: 'eSnail',
                description: '2 widgets',
                amount: totalCost
            });
        };

        $scope.uploadToS3 = function() {
            $http.post('/file/upload', { message: 'Upload Files' })
                .success(function(data) {
                    console.log('Success Upload');
                })
                .error(function(data) {
                    console.log('Error Upload');
                });
        };

        $scope.removeFile = function(item) {
            var filename = item.file.name.replace(/ /g,'').slice(0, -4);
          
            var fileLength = $('#' + filename).html();
            fileLength = parseInt(fileLength.slice(0, fileLength.indexOf(' ')));

            totalCost -= ( fileLength * 39 );

            $http.delete('/file/remove/' + item.file.name);

            item.remove();
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
// 