app.controller(
		'CardCtrl',
		function($scope, $q, $uibModal, $log, $http, $routeParams) {

			$scope.items = $http.get(
					'services/board/' + $routeParams.boardId + '/card')
					.success(function(data) {
						$scope.board = data;
						$scope.items = data.cards;
					});

			$scope.animationsEnabled = true;

			$scope.toggleAnimation = function() {
				$scope.animationsEnabled = !$scope.animationsEnabled;
			};

			$scope.drop = function(id, target){
				var card = $scope.items[id];
				card.status = target;
				console.log(card);
				$http.put('services/' + $routeParams.boardId + '/card',
						card).success(function(data) {
							console.log(data);
							//$scope.items.push(data);
				});

			};

			$scope.remove = function(index) {
				var element = $scope.items[index];
				$http.get(
						'services/' + $routeParams.boardId + '/card/'
								+ element.id).success(function() {
					$scope.items.splice(index, 1);
				});
			};

			$scope.open = function(card) {

				var modalInstance = $uibModal.open({
					animation : $scope.animationsEnabled,
					templateUrl : 'myModalContent.html',
					controller : 'CardModalInstanceCtrl',
					resolve : {
						card : card
					}
				});

				modalInstance.result.then(function(card) {

					$http.post('services/' + $routeParams.boardId + '/card',
							card).success(function(data) {
						$scope.items = data.cards;
					});

				}, function() {
					$log.info('Modal dismissed at: ' + new Date());
				});

			};

		}).controller('CardModalInstanceCtrl',
		function($scope, $uibModalInstance, card) {

			$scope.card = card;

			$scope.save = function() {
				$scope.card.status = 'todo';
				$uibModalInstance.close($scope.card);
			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss('Cancel');
			};

			$scope.ok = function() {
				$uibModalInstance.dismiss('Ok');
			};

		});
