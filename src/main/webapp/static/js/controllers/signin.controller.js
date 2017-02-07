(function(){
	'use strict';
	
	angular.module('famban.signin')
		.controller('SigninCtrl', signinCtrl);

	signinCtrl.$inject = ['$http'];
	
	function signinCtrl($http){
		var vm = this;
		vm.submit = submit;
		
		function submit(){
			$http.post('pages/services/user', vm.user).success(function(){
				window.location.assign("index.html");
		    });
		}
		
	}
	
})();