'use strict';

module.exports = function(app) {

	app.controller('cbmAdminController', function($scope, mealsServer) {
		$scope.creatingNewMeal = false;

		//Uses meals-server.js to get all the existing meal data
		$scope.getAllMeals = function() {
			mealsServer.index()
			.success(function(data){
				$scope.meals = data;
			});
		};

		$scope.getAllMeals();

		//saves a new meal along with all its components
		$scope.saveNewMeal = function(mealDetail) {
			mealsServer.saveNewMeal($scope.newMeal)
				.success(function(data) {
					$scope.meals.push(data);
					$scope.newMeal.name = '';
					$scope.newMealForm.$setPristine();
				});
		};

		$scope.editMeal = function(meal) {
			meal.editing = true;
		};

		$scope.saveMeal = function(meal) {
			mealsServer.saveOldMeal(meal)
				.success(function(data) {
					$scope.getAllMeals();
				});
		};

		$scope.deleteMeal = function(meal) {
			mealsServer.deleteMeal(meal)
				.success(function(data) {
					$scope.getAllmeals();
				})
		};
		
		$scope.siteName = "Chicken Breast Meals.com";
		$scope.orderProp = 'cooktime';
	});
};