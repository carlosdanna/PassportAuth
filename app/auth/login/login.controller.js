(function(){
	'use strict'
	angular.module('authModule')
	.controller('loginController', ['$state', 'AuthServices', function($state, AuthServices){
		var vm = this;
		vm.user = {};
		vm.message = false;
		vm.serverError = {};

		vm.login=function(){
			
			AuthServices.Login(vm.user).then(function(data){
				console.log(data);
				if(data != 'Unauthorized'){
					//$state.go('profile');
				}else{
					$state.go('login',{},{reload: true});
				}
			});

		}
		
		return vm;
	}]);

})()