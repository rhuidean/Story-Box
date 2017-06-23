var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	
	.when('/', {
		templateUrl: 'partials/users_new.html',
		controller: 'UsersController as UC'
	})

	.when('/dashboards', {
		templateUrl: 'partials/dashboard.html',
		controller: 
	})

	.when('/users/:id',{
		templateUrl: 'partials/user.html',
		controller: 'StoriesController as SC'
	})

	.when('/query',{
		templateUrl: 'partials/query.html',
		controller: 
	})

	.otherwise({ redirectTo: '/'});
})