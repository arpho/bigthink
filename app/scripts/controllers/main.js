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
              user.logged = true;
              $scope.esitoLogin = "benvenuto "+user.name;
              $rootScope.user = user;
          }).error(function(data, status, headers, config) {
              debug('login failure');
              $scope.esitoLogin ='Login fallito';
          })
  }
        
    })
  }).controller('RegCtrl',function($scope,$http,md5) {
    $scope.checkPassword = function() {
        debug('checking password');
        $scope.nomatch = false;
        if( $scope.password != $scope.passwordMatch) { $scope.nomatch = true;}
        debug('password nomatch'+$scope.nomatch)
        debug($scope.password);
        debug($scope.passwordMatch);
    }
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
        $http.post('/api/registerUser',user).success(function() {
            
            $scope.result = 'utente '+user.name +' registrato';
        });
    }
}).controller('ReservedCtrl', function($scope) {
    if ($scope.user) {
        $scope.logged = true;
        
    }
}).directive('pwCheck', [function () {
	return {
		require: 'ngModel',
		link: function (scope, elem, attrs, ctrl) {
			var firstPassword = '#' + attrs.pwCheck;
			elem.add(firstPassword).on('keyup', function () {
				scope.$apply(function () {
					var v = elem.val()===$(firstPassword).val();
					ctrl.$setValidity('pwmatch', v);
				});
			});
		}
	}
}]).controller('StaticCtrl',function($scope) {
 $scope.static = 'stupid page';   
});
