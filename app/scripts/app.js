'use strict';

angular.module('bigthinkApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'angular-md5'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).when('/registrazione', {
        templateUrl: 'views/register.html',
        controller:'RegCtrl'
    }).when('/riservato', {
        templateUrl: 'views/riservato.html',
        controller: 'ReservedCtrl'
    }).when('/static', {
        templateUrl:'views/static.html',
        controller:'StaticCtrl'
    })
      .otherwise({
        redirectTo: '/'
      });
  });
