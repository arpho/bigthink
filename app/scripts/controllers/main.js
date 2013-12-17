'use strict';

var debug = function(s) {
    console.debug(s);
}

angular.module('bigthinkApp')
  .controller('MainCtrl', function ($rootScope,$scope, $http,md5) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
        $scope.login = function() {
            debug('login');
          $rootScope.user = {};
          var user2check = {};
          user2check.name = $scope.userName;
          user2check.password = md5.createHash($scope.password);
          debug($scope.userName);
          //debug($scope.password);
          $http.post('/api/login',user2check).success(function(user) {
              debug('login done');
              debug(user);
              $scope.esitoLogin = "benvenuto "+user.name;
          }).error(function(data, status, headers, config) {
              debug('login failure');
              $scope.esitoLogin ='Login fallito';
          })
  }
        
    })
  }).controller('RegCtrl',function($scope,$http,md5) {
    
    $scope.submitUser = function() {
        debug('submit user');
        var user = {};
        user.name =  $scope.name;
        user.surname = $scope.surname;
        user.dob = new Date($scope.dob);
        user.mail = $scope.mail;
        user.city = $scope.city;
        user.password = md5.createHash($scope.password);
        debug(user);
        $http.post('/api/registerUser',user);
    }
});
