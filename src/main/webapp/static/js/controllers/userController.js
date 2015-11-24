app.controller('UserCtrl', function($scope, $http, $routeParams) {

	$http.get('services/board/' + $routeParams.boardId + '/user').success(function(data){
		$scope.users = data;
	});
	
	$scope.getLocation = function(val) {
		return $http.get('services/user/' + val).then(function(response) {
			return response.data.map(function(item) {
				return item.username;
			});
		});
	};
	
	$scope.submit = function(){
		$http.get('services/board/' + $routeParams.boardId + '/user/' + $scope.userSelected).success(function(data){
			$scope.users.push({username: $scope.userSelected});
			$scope.userSelected = "";
		});
	};

});
