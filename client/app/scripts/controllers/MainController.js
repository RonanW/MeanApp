'use strict';

angular.module('MeanApp').controller('MainController', ['$scope', '$http', '$location', '$filter', 'Authentication',
    function($scope, $http, $location, $filter, Authentication) {

        $scope.authentication = Authentication;
        // If user is signed in then redirect back home
        if ($scope.authentication.user) {
        console.log($scope.authentication);
            if($scope.authentication.user.permissions === 5) {
                $location.path('/admin');
            } else {
                $location.path('/profile');
            }
        } else {
                $location.path('/');
        } 

        $scope.signin = function() {
            // convert username to lowercase, password is case sensitive
            $scope.credentials.username = $filter('lowercase')($scope.credentials.username);
            // hit server with credentials
            $http.post('/auth/login', $scope.credentials).success(function(response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;
                // And redirect to the index page
                $location.path('/profile');
            }).error(function(response) {
                $scope.credentials.error = response.message;
            });
        }

        $scope.signout = function() {
            $http.post('/auth/logout', $scope.credentials).success(function(response) {
                $scope.authentication.user = null;
                $location.path('/');
            })
        }
    }
]);
