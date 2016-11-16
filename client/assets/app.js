var app = angular.module('discussionApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/partials/login.html',
			controller: 'loginController',
			controllerAs: 'lC'
		})
		.when('/user/:id', {
			templateUrl: '/partials/user.html',
			controller: 'userController',
			controllerAs: 'uC'
		})
		.when('/dashboard', {
			templateUrl: '/partials/dashboard.html',
			controller: 'dashboardController',
			controllerAs: 'dC'
		})
		.when('/topic/:id', {
			templateUrl: '/partials/topic.html',
			controller: 'topicController',
			controllerAs: 'tC'
		})
		.otherwise({
			redirectTo: '/'
		})
})
