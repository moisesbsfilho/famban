app.controller('BoardCtrl', function($scope, $q, $uibModal, $log, $http) {
    
    $http.get('services/board').success(function(data){
    	$scope.boards = data;
    });

    $scope.animationsEnabled = true;

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.open = function (board) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'BoardModalInstanceCtrl',
        resolve: {
          board: board
        }
      });

      modalInstance.result.then(function (board) {
    	  $http.post('services/board', board).success(function(data){
    		  $scope.boards.push(data);
    	  });        
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    };

}).controller('BoardModalInstanceCtrl', function($scope, $uibModalInstance, board){

  $scope.board = board;

  $scope.save = function () {
    $uibModalInstance.close($scope.board);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('Cancel');
  };

  $scope.ok = function () {
    $uibModalInstance.dismiss('Ok');
  };

});
