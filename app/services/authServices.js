(function(){
	'use strict'
	angular.module('authModule')
	.factory('AuthServices', AuthServices);

	function AuthServices($http, $q,$state){
		var AuthServices = {};

		var _signin = function(data){
			var deferred = $q.defer();
			$http.post('/signin',data).success(function(data){
				deferred.resolve(data);
			}).error(function(data){
				deferred.resolve(data);
			});
			return deferred.promise;
		}

		var _login = function(data){
			var deferred = $q.defer();
			$http.post('/login',data).success(function(data){
				deferred.resolve(data);
			}).error(function(data, status){
				if(status == 401) 

					deferred.reject('Check if the email and password you entered are correct');
			});
			return deferred.promise;
		}


		AuthServices.Signin = _signin;
		AuthServices.Login = _login;
		return AuthServices;
	}


	/*
	var _getManagers = function(){
		var deferred = $q.defer(); 
		$http.get('/managers').success(function(data){
			deferred.resolve(data);
		}).error(function(data){
			deferred.resolve(data);
		});		
		return deferred.promise;
	}*/

})();