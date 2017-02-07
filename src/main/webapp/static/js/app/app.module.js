(function(){
	'use strict';
	
	angular.module('famban', [
	       //Angular modules
	       'ngRoute',
	       
	       //3rd Party Modules
	       'ui.bootstrap',
	       
	       //Application Modules
	       'famban.card',
	       'famban.board',
	       'famban.user',
	       'famban.signin',
	]);
	
})();
