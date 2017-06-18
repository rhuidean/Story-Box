var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	
	.when('/', {
		templateUrl: 'partials/users_new.html',
		controller: 'UsersController as UC'
	})

	.otherwise({ redirectTo: '/'});
})