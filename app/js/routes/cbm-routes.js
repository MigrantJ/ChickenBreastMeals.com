'use strict';

module.exports = function(app, jwtauth) {
	app.config(function($routeProvider) {
		$routeProvider

		//default page
		.when('/', {
			templateUrl: '/views/public/main.html',
			controller: 'cbmMainController'
		})

		.when('/recipe/:url', {
			templateUrl: '/views/public/recipe.html',
			controller: 'cbmRecipeController'
		})

		.when('/about', {
			templateUrl: '/views/public/about.html',
			controller: 'cbmMainController'
		})

		.when('/tools', {
			templateUrl: '/views/public/tools.html',
			controller: 'cbmMainController'
		})

		.when('/admin', {
			templateUrl: '/views/admin/admin.html',
			controller: 'cbmAdminController'
		})

		.when('/login', {
			templateUrl: '/views/admin/login.html',
			controller: 'cbmUserController'
		})

		.when('/signup', {
			templateUrl: '/views/admin/login.html',
			controller: 'cbmUserController'
		})

		.when('/logout', {
			templateUrl: '/views/admin/login.html',
			controller: 'cbmUserController'
		})

		.otherwise({
			redirectTo: '/'
		})
	});
};