var app = angular.module('app',['ngRoute']);

// backend api calls vs front view calls
app.config(function($routeProvider){
	$routeProvider
	
	.when('/', {
		templateUrl: 'partials/users_new2.html',
		controller: 'UsersController as UC'
	})

	// Must assign Controller to use req.params
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: 'UsersController as UC'
	})

	.when('/users/:id',{
		templateUrl: 'partials/user.html',
		controller: 'UsersController as UC'
	})

	.when('/query',{
		templateUrl: 'partials/query.html',
		controller: 'UsersController as UC'
	})

	.otherwise({ redirectTo: '/'});
})