'use strict';

angular.module('eSnailApp')
.directive('googleAutocomplete', function() {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            options: '=?',
            details: '=?'
        },
        link: function(scope, element, attrs, controller) {
            var opts;
            var watchEnter = false;
            /* Convert options provided to opts */
            var initOpts = function() {
                opts = {};
                if (scope.options) {
                    if (scope.options.watchEnter !== true) {
                        watchEnter = false;
                    } else {
                        watchEnter = true;
                    }
                    if (scope.options.types) {
                        opts.types = [];
                        opts.types.push(scope.options.types);
                        scope.gPlace.setTypes(opts.types);
                    } else {
                        scope.gPlace.setTypes([]);
                    }
                    if (scope.options.bounds) {
                        opts.bounds = scope.options.bounds;
                        scope.gPlace.setBounds(opts.bounds);
                    } else {
                        scope.gPlace.setBounds(null);
                    }
                    if (scope.options.country) {
                        opts.componentRestrictions = {
                            country: scope.options.country
                        };
                        scope.gPlace.setComponentRestrictions(opts.componentRestrictions);
                    } else {
                        scope.gPlace.setComponentRestrictions(null);
                    }
                }
            };

            if (scope.gPlace === undefined) {
                scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
            }

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                var result = scope.gPlace.getPlace();
                if (result !== undefined) {
                    if (result.address_components !== undefined) {

                        scope.$apply(function() {
                            scope.details = result;

                            var parsedAddress = parseAddressComponents(result.address_components),
                                isCityRequest = (scope.options.types === '(cities)'),
                                oldVal,
                                newVal;

                            console.log(isCityRequest);

                            if (isCityRequest) {
                                scope.$emit('city_changed', parsedAddress);
                                oldVal = controller.$modelValue;
                            } else {
                                scope.$emit('address_changed', parsedAddress);
                                element.val(parsedAddress.streetAddress1);
                                oldVal = parsedAddress.streetAddress1;
                            }

                            element.bind('blur', function(e) {
                                newVal = controller.$modelValue;
                                if (oldVal != newVal) {
                                    element.val(newVal);
                                } else {
                                    element.val(oldVal);
                                }
                                element.unbind('blur');
                            });
                        });
                    }
                    else {
                        if (watchEnter) {
                            getPlace(result);
                        }
                    }
                }
            });

            //function to get retrieve the autocompletes first result using the AutocompleteService 
            var getPlace = function(result) {
                var autocompleteService = new google.maps.places.AutocompleteService();
                if (result.name.length > 0){
                    autocompleteService.getPlacePredictions(
                        {
                            input: result.name,
                            offset: result.name.length
                        },
                        function listentoresult(list, status) {
                            if(list === null || list.length === 0) {

                                scope.$apply(function() {
                                    scope.details = null;
                                });

                            } else {
                                var placesService = new google.maps.places.PlacesService(element[0]);
                                placesService.getDetails(
                                    {'reference': list[0].reference},
                                    function detailsresult(detailsResult, placesServiceStatus) {

                                        if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                                            scope.$apply(function() {

                                                // controller.$setViewValue('');
                                                // console.log('detailsResult', detailsResult);
                                                // element.val('');

                                                scope.details = detailsResult;
                                                var parsedAddress = parseAddressComponents(detailsResult.address_components);
                                                console.log(detailsResult);

                                                if (scope.options.types === '(cities)') {
                                                    scope.$emit('city_changed', parsedAddress);
                                                } else {
                                                    scope.$emit('address_changed', parsedAddress);
                                                }
                                                // controller.$setViewValue(parsedAddress.streetAddress1);
                                                // controller.$setViewValue(detailsResult.formatted_address);
                                                // element.val(controller.$modelValue);

                                                //on focusout the value reverts, need to set it again.
                                                var watchFocusOut = element.on('blur', function(event) {
                                                    element.val(controller.$modelValue);
                                                    // element.val(parsedAddress.streetAddress1);
                                                    // element.val(detailsResult.formatted_address);
                                                    element.unbind('blur');
                                                });

                                            });
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            };

            var parseAddressComponents = function(addressComponents) {
                var type, value;

                var parsedAddress = {
                    streetAddress1: '',
                    city: '',
                    state: '',
                    postalCode: ''
                };

                for (var component in addressComponents) {
                    type = addressComponents[component].types[0];
                    value = addressComponents[component].short_name;

                    switch (type) {
                        case 'street_number':
                            if (parsedAddress.streetAddress1) {
                                parsedAddress.streetAddress1 = value + ' ' + parsedAddress.streetAddress1;
                            } else {
                                parsedAddress.streetAddress1 = value;
                            }
                            break;
                        case 'route':
                            if (parsedAddress.streetAddress1) {
                                parsedAddress.streetAddress1 += (' ' + value);
                            } else {
                                parsedAddress.streetAddress1 = value;
                            }
                            break;
                        case 'locality':
                            parsedAddress.city = addressComponents[component].long_name;
                            break;
                        case 'administrative_area_level_1':
                            parsedAddress.state = value;
                            break;
                        case 'postal_code':
                            parsedAddress.postalCode = value;
                            break;
                        default:
                            break;
                    }
                }
                return parsedAddress;
            };

            // controller.$render = function () {
            //     var location = controller.$viewValue;
            //     element.val(location);
            // };

            /* Watch options provided to directive */
            scope.watchOptions = function () {
                return scope.options;
            };
            scope.$watch(scope.watchOptions, function () {
                initOpts();
            }, true);

        }
    };
});