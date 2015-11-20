app.controller('CardCtrl', function($scope, $q, $uibModal, $log, $http, $routeParams) {
	
	$scope.items = $http.get('services/board/'+$routeParams.boardId+'/card').success(function(data){
    	$scope.board = data;
		$scope.items = data.cards;
    });

    $scope.animationsEnabled = true;

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.drop = function(id, target){
      var element = $scope.items[id];
      //Chamada rest para alteração do card
      element.status = target;
    };

    $scope.open = function (card) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'CardModalInstanceCtrl',
        resolve: {
          card: card
        }
      });

      modalInstance.result.then(function (card) {
    	  
    	  $http.post('services/' + $routeParams.boardId + '/card', card).success(function(data){
    		 $scope.items = data.cards;
    	  });
    	  
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    };

}).controller('CardModalInstanceCtrl', function($scope, $uibModalInstance, card){

  $scope.card = card;

  $scope.save = function () {
	$scope.card.status = 'todo';
    $uibModalInstance.close($scope.card);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('Cancel');
  };

  $scope.ok = function () {
    $uibModalInstance.dismiss('Ok');
  };

});
