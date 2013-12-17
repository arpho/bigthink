'use strict';

var debug = function(s) {
    console.debug(s);
}

angular.module('bigthinkApp')
  .controller('MainCtrl', function ($scope, $http,md5) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
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
