'use strict';

// Authentication service for user variables
angular.module('MeanApp').factory('Authentication', [
    function() {

        auth_user = {
            user: window.user
        };

        return auth_user;
    }
]);