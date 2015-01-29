'use strict';

angular.module('MeanApp', ['ngResource','ngRoute']).config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/signin.html',
        controller:  'MainController',
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller:  'MainController',
      })
      .when('/admin', {
        templateUrl: 'views/admin-profile.html',
        controller:  'AttemptsController',
      })
      .otherwise({
        redirectTo: '/',
      });
  });
