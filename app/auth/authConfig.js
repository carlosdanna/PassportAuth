(function(){
	'use strict'
	angular.module('authModule')
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		
		$urlRouterProvider.otherwise('login');
		
		$stateProvider
			.state('login',{
				url: '/login',
				templateUrl: 'auth/login/login.tmpl.html',
				controller: 'loginController',
				controllerAs: 'vm'
			})
			.state('signin',{
				url: '/signin',
				templateUrl: 'auth/signin/signin.tmpl.html',
				controller: 'signinController',
				controllerAs: 'vm'
			});
	}]);
})();