app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/boards', {
			templateUrl: 'pages/board.html'
		}).
		when('/boards/:boardId', {
			templateUrl: 'pages/view.html',
			controller: 'CardCtrl'
		}).
		otherwise({
			redirectTo: '/boards'
		})
}]);