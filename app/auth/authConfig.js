(function(){
	'use strict'
	angular.module('authModule')
	.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){
		
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
			})

			.state('logout',{
				url: '/logout',
				templateUrl: 'auth/logout/logout.tmpl.html',
				controller: 'logoutController',
				controllerAs: 'vm'
			})

			.state('dashboard',{
				url: '/dashboard',
				templateUrl: 'auth/dashboard/dashboard.tmpl.html',
				controller: 'dashboardController',
				controllerAs: 'vm'
			});

		//this function intercepts all calls to the server and checks for a 401 status code 
		//if true it sends the user to the login page
		$httpProvider.interceptors.push(function($q, $location) {
	      	return {
	        	response: function(response) {
		          	// do something on success
		          	return response;
	        	},
	        	responseError: function(response) {
		          	if (response.status === 401)
		            	$location.url('/login');
		          	return $q.reject(response);
	        	}
	      	};
	    });

	}]);
})();