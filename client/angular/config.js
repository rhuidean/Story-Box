var app = angular.module('app',['ngRoute']);

// backend api calls vs front view calls
app.config(function($routeProvider){
	$routeProvider
	
	.when('/', {
		templateUrl: 'partials/users_new.html',
		controller: 'UsersController as UC'
	})

	// Must assign Controller to use req.params
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: 'UsersController as UC'
	})

	.when('/users/:id',{
		templateUrl: 'partials/user.html',
		controller: 'StoriesController as SC'
	})

	.when('/query',{
		templateUrl: 'partials/query.html'
	})

	.otherwise({ redirectTo: '/'});
})