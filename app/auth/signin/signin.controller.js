(function(){
	'use strict'
	angular.module('authModule')
	.controller('signinController', ['$state','AuthServices', function($state, AuthServices){
		var vm = this;
		vm.user = {};

		vm.message = false;
		vm.serverError = {};
		vm.serverError.show = false;

		vm.createNewUser = function(){
			
			if(vm.user.password == vm.user.repeatpassword){
				//call service to create user
				AuthServices.Signin(vm.user).then(function(data){
					
					vm.message = false;
					if (data.error == false)
					{
						$state.go('login');
					}
					else
					{
						vm.serverError.show 	= data.error;
						vm.serverError.message = data.message;
					}
				});
			}else{
				vm.message = true;
			}
		}

		return vm;
	}]);
})()