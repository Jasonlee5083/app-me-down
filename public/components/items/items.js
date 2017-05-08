var app = angular.module("appMeDown");

app.controller("itemController", ["$scope", "$http", "itemService", function ($scope, $http, itemService) {
 
    $scope.items = [];
	
			itemService.getItems().then(function (response) {
			$scope.items = response;
			console.log(response);
		})
		

	$scope.submit = function (input) {
		itemService.postItems(input).then(function (data) {
			$scope.items.push(data);
		})
	}

	$scope.remove = function (index, id) {
		itemService.removeItems(id).then(function (response) {
			$scope.items.splice(index, 1);
		})
	}

	$scope.save = function (newitem) {
		itemService.saveItems(newitem);
	}

}]);