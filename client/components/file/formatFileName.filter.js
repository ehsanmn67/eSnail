'use strict';

angular.module('eSnailApp')
    .filter('formatFileName', function() {
        return function(input) {
            input = input.slice(0, -4);
            return input.replace(/ /g,'');
        };
    }
);