'use strict';

// Authentication service for user variables
angular.module('MeanApp').factory('Authentication', [
    function() {

        var auth_user = this;

        auth_user = {
            user: window.user
        };

        return auth_user;
    }
]);