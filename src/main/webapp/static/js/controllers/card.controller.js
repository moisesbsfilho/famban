(function(){
	'use strict';
	
	angular.module('famban.card')
		.controller('CardCtrl', cardCtrl)
		.controller('CardModalInstanceCtrl', cardModalInstanceCtrl);
	
	cardCtrl.$inject = ['$q', '$uibModal', '$log', '$http', '$routeParams'];
	cardModalInstanceCtrl.$inject = ['$uibModalInstance', 'card'];
	
	function cardCtrl($q, $uibModal, $log, $http, $routeParams){
		
		var vm = this;
		vm.items = [];
		vm.list = list;
		vm.drop = drop;
		vm.remove = remove;
		vm.open = open;
		vm.toggleAnimation = toggleAnimation;
		
		initilize();
		
		function initilize(){
			vm.animationsEnabled = true;
			vm.toggleAnimation();
			vm.list();
		}
		
		function list(){
			$http.get(
				'services/board/' + $routeParams.boardId + '/card')
				.success(function(data) {
					vm.board = data;
					vm.items = data.cards;
			});
		}
		
		function drop(id, target){
			var card = vm.items[id];
			card.status = target;
			console.log(card);
			$http.put('services/' + $routeParams.boardId + '/card',
					card).success(function(data) {
						console.log(data);
			});
		}
		
		function remove(index){
			var element = vm.items[index];
			$http.get(
					'services/' + $routeParams.boardId + '/card/'
							+ element.id).success(function() {
				vm.items.splice(index, 1);
			});
		}
		
		function open(){
			var modalInstance = $uibModal.open({
				animation : vm.animationsEnabled,
				templateUrl : 'myModalContent.html',
				controller : 'CardModalInstanceCtrl',
				resolve : {
					card : card
				}
			});

			modalInstance.result.then(function(card) {

				$http.post('services/' + $routeParams.boardId + '/card',
						card).success(function(data) {
					vm.items = data.cards;
				});

			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		
		function toggleAnimation() {
			vm.animationsEnabled = !vm.animationsEnabled;
		};
		
	}
	
	function cardModalInstanceCtrl($uibModalInstance, card){
		var vm = this;
		vm.save = save;
		vm.cancel = cancel;
		vm.ok = ok;
		
		initilize();
		
		function initilize(){
			vm.card = card;
		}
		
		function save(){
			vm.card.status = 'todo';
			$uibModalInstance.close(vm.card);
		}
		
		function cancel(){
			$uibModalInstance.dismiss('Cancel');
		}
		
		function ok(){
			$uibModalInstance.dismiss('Ok');
		}

	}
	
})();