(function(){
	'use strict'
	angular.module('authModule')
	.controller('logoutController', ['$state','AuthServices', function($state, AuthServices){
		var vm = this;
		vm.user = {};
		

		vm.otherfunction = function(){
			AuthServices.Logout();
		}

		return vm;
	}]);
})();