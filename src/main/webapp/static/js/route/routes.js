app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/boards', {
			templateUrl: 'board.html'
		}).
		when('/boards/:boardId', {
			templateUrl: 'board-detail.html',
			controller: 'CardCtrl'
		}).
		otherwise({
			redirectTo: '/boards'
		})
}]);