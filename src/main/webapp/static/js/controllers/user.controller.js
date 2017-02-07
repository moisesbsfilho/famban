(function(){
	'use strict';
	
	angular.module('famban.user')
		.controller('UserCtrl', userCtrl);

	userCtrl.$inject = ['$http', '$routeParams'];
	
	function userCtrl($http, $routeParams){
		var vm = this;
		vm.list = list;
		vm.getLocation = getLocation;
		vm.submit = submit;
		
		initilize();
		
		function initilize(){
			vm.list();
		}
		
		function list(){
			$http.get('services/board/' + $routeParams.boardId + '/user').success(function(data){
				$scope.users = data;
			});
		}
		
		function getLocation(val){
			return $http.get('services/user/' + val).then(function(response) {
				return response.data.map(function(item) {
					return item.username;
				});
			});
		}
		
		function submit(){
			$http.get('services/board/' + $routeParams.boardId + '/user/' + $scope.userSelected).success(function(data){
				$scope.users.push({username: $scope.userSelected});
				$scope.userSelected = "";
			});
		}
	}
	
})();