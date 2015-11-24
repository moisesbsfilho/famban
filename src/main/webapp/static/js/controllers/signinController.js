var app = angular.module('famban', []);
app.controller('SigninCtrl', function($scope, $http) {

	$scope.submit = function() {
		$http.post('pages/services/user', $scope.user).success(function(){
			window.location.assign("index.html");
	    });
	}

});
