(function(){
	'use strict'
	angular.module('authModule')
	.controller('dashboardController', ['$state','AuthServices', function($state, AuthServices){
		var vm = this;
		

		vm.message = false;
		vm.serverError = {};
		vm.serverError.show = false;
		vm.logout = function(){
			$state.go('logout');
		}

		vm.testFunction = function(){
			AuthServices.GetReqUser().then(function(data){
				console.log('Its true ... magic is happening and I mastered passport js with local strategy');
				console.log(data.access);
			})
		}



		return vm;
	}]);
})()