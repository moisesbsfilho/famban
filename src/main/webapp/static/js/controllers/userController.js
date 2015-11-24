var app = angular.module('famban', []);
app.controller('UserCtrl', function($scope, $http) {

	$scope.submit = function() {
		$http.post('pages/services/user', $scope.user).success(function(){
	    	console.log("Ok");
	    });
	}

});
