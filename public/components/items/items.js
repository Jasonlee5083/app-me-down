var app = angular.module("appMeDown");

app.service("itemService", ["$http", function ($http) {
    this.getitems = function () {
        return $http.get("/api/items").then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };
	
	this.postitems = function(newitem) {
		return $http.post("/api/items",newitem).then(function(response){
			return response.data;
		})
		
	}
	
	this.removeitems = function(id) {
		return $http.delete("/api/items" + id).then(function(response){
			return "you item has been deleted"
		})
	}

    this.saveitems = function (item) {
        return $http.post("/api/items", newitem).then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };
}]);

app.controller("itemController", ["$scope", "$http", "itemService", function ($scope, $http, itemService) {
 
    $scope.items = [];
	
			itemService.getitems().then(function (response) {
			$scope.items = response;
			console.log(response);
		})
		

	$scope.submit = function (input) {
		itemService.postitems(input).then(function (data) {
			$scope.items.push(data);
		})
	}

	$scope.remove = function (index, id) {
		itemService.removeitems(id).then(function (response) {
			$scope.items.splice(index, 1);
		})
	}

	$scope.save = function (newitem) {
		itemService.saveitems(newitem);
	}

}]);