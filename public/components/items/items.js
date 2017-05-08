var app = angular.module("appMeDown");

app.service("ItemService", ["$http", function ($http) {
    this.getItems = function () {
        return $http.get("/api/items").then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };
	
	this.postItems = function(newitem) {
		return $http.post("/api/items",newitem).then(function(response){
			return response.data;
		})
		
	}
	
	this.removeItems = function(id) {
		return $http.delete("/api/items" + id).then(function(response){
			return "you item has been deleted"
		})
	}

    this.saveItems = function (todo) {
        return $http.post("/api/items", newitem).then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };
}]);

app.controller("ItemController", ["$scope", "$http", "ItemService", function ($scope, $http, ItemService) {
 
    $scope.items = [];
	
			ItemService.getItems().then(function (response) {
			$scope.items = response;
			console.log(response);
		})
		

	$scope.submit = function (input) {
		ItemService.postItems(input).then(function (data) {
			$scope.items.push(data);
		})
	}

	$scope.remove = function (index, id) {
		ItemService.removeItems(id).then(function (response) {
			$scope.items.splice(index, 1);
		})
	}

	$scope.save = function (newitem) {
		ItemService.saveItems(newitem);
	}

}]);