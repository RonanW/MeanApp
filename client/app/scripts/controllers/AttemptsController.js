'use strict';

angular.module('MeanApp').controller('AttemptsController', ['$scope', '$resource', function ($scope, $resource) {
  var Attempt = $resource('/auth/attempts');
  
  $scope.attempts = []

  Attempt.query(function (results) {
    $scope.attempts = results;
  });

}]);