var app = angular.module("appMeDown");

app.controller("itemController", ["$scope", "$http", "itemService", function ($scope, $http, itemService) {

	$scope.items = [];

	itemService.getItems().then(function (response) {
		return $scope.items = response;
	})


	$scope.submit = function (newItem) {
		itemService.postItems(newItem).then(function () {
			$scope.items.push(newItem);
			console.log($scope.items);
		})
	}

	$scope.remove = function (index, id) {
		itemService.removeItems(id).then(function (response) {
			$scope.items.splice(index, 1);
		})
	}

	$scope.save = function (newItem) {
		itemService.saveItems(newItem);
	}

    $scope.showForm = function () {
        $scope.message = "Show Form Button Clicked";
        console.log($scope.message);
        var modalInstance = $uibModal.open({
            templateUrl: "add-item-modal.html",
            controller: "itemModalInstanceController",
            scope:$scope,
            resolve: {
                itemForm: function () {

                    return $scope.itemForm;
                }
            }
        });

        modalInstance.result.then(function (newItem) {
            $scope.selected = newItem;
        }, function () {
            $log.info("Modal dismissed at: " + new Date());
        });
    };

}]);
