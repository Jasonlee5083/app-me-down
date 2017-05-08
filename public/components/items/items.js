var app = angular.module("appMeDown");

<<<<<<< HEAD
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

=======
>>>>>>> 78552b72a1386bacb82e934f7e1f1f5fb4f03340
app.controller("itemController", ["$scope", "$http", "itemService", function ($scope, $http, itemService) {
 
    $scope.items = [];
	
<<<<<<< HEAD
			itemService.getitems().then(function (response) {
=======
			itemService.getItems().then(function (response) {
>>>>>>> 78552b72a1386bacb82e934f7e1f1f5fb4f03340
			$scope.items = response;
			console.log(response);
		})
		

	$scope.submit = function (input) {
<<<<<<< HEAD
		itemService.postitems(input).then(function (data) {
=======
		itemService.postItems(input).then(function (data) {
>>>>>>> 78552b72a1386bacb82e934f7e1f1f5fb4f03340
			$scope.items.push(data);
		})
	}

	$scope.remove = function (index, id) {
<<<<<<< HEAD
		itemService.removeitems(id).then(function (response) {
=======
		itemService.removeItems(id).then(function (response) {
>>>>>>> 78552b72a1386bacb82e934f7e1f1f5fb4f03340
			$scope.items.splice(index, 1);
		})
	}

	$scope.save = function (newitem) {
<<<<<<< HEAD
		itemService.saveitems(newitem);
=======
		itemService.saveItems(newitem);
>>>>>>> 78552b72a1386bacb82e934f7e1f1f5fb4f03340
	}

}]);