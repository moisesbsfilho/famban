(function(){
	'use strict';
	
	angular.module('famban.board')
		.controller('BoardCtrl', boardCtrl)
		.controller('BoardModalInstanceCtrl', boardModalInstanceCtrl);
	
	boardCtrl.$inject = ['$q', '$uibModal', '$log', '$http'];
	boardModalInstanceCtrl.$inject = ['$uibModalInstance', 'board'];
	
	function boardCtrl($q, $uibModal, $log, $http){
		var vm = this;
		vm.boards = [];
		vm.list = list;
		vm.open = open;
		vm.toggleAnimation = toggleAnimation;
		
		initilize();
		
		function initilize(){
			vm.list();
			vm.animationsEnabled = true;
			vm.toggleAnimation();
		}
		
		function list(){
			$http.get('services/board').success(function(data){
		    	vm.boards = data;
		    });
		}
		
		function toggleAnimation(){
			vm.animationsEnabled = !vm.animationsEnabled;
		}
		
		function open(board){
			var modalInstance = $uibModal.open({
		        animation: vm.animationsEnabled,
		        templateUrl: 'myModalContent.html',
		        controller: 'BoardModalInstanceCtrl',
		        resolve: {
		          board: board
		        }
			});

			modalInstance.result.then(function (board) {
				$http.post('services/board', board).success(function(data){
					vm.boards.push(data);
				});        
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		
	}
	
	function boardModalInstanceCtrl($uibModalInstance, board){
		var vm = this;
		vm.save = save;
		vm.cancel = cancel;
		vm.ok = ok;
		
		initilize();
		
		function initilize(){
			vm.board = board;
		}
		
		function save(){
			$uibModalInstance.close(vm.board);
		}
		
		function cancel(){
			$uibModalInstance.dismiss('Cancel');
		}
		
		function ok(){
			$uibModalInstance.dismiss('Ok');
		}
	}
	
})();
