var app = angular.module("appMeDown");

app.controller("itemController", ["$scope", "$log", "$http", "$uibModal", "itemService", "mapService", function ($scope, $log, $http, $uibModal, itemService, mapService) {

    $scope.favoriteItems = [];
    $scope.searchedItems = [];

    $scope.favorite = function (item) {
        itemService.postFavorite(item).then(function (response) {

        })

    }

	itemService.getItems().then(function (items) {
		items.forEach(function (item) {
			item.map = {
				center: {
					latitude: item.place.lat,
					longitude: item.place.lng
				},
				zoom: 14
			};
			item.options = {
				maxZoom: 14
			};
			item.marker = {
				id: item._id,
				coords: {
					latitude: item.place.lat,
					longitude: item.place.lng
				},
				window: {
					title: item.place.name
				}
			}
		});
		$scope.items = items;
	});


    $scope.submit = function (newItem) {
        itemService.postItems(newItem).then(function () {
            $scope.items.push(newItem);
            console.log($scope.items);
        });
    };

    $scope.remove = function (index, id) {
        itemService.removeItems(id).then(function (response) {
            $scope.items.splice(index, 1);
        });
    };

	$scope.save = function (newItem) {
		itemService.saveItems(newItem);
	};
	$scope.showForm = function () {
		var modalInstance = $uibModal.open({
			templateUrl: "add-item-modal.html",
			controller: "itemModalInstanceController",
			scope: $scope,
			resolve: {
				itemForm: function () {
					return $scope.itemForm;
				}
			}
		});

		modalInstance.result
			.then(function (data) {
				return itemService.postItems(data)
			})
			.then(function (newItem) {
				newItem.map = {
					center: {
						latitude: newItem.place.lat,
						longitude: newItem.place.lng
					},
					zoom: 14
				};
				newItem.options = {
					maxZoom: 14
				};


                newItem.marker = {
                    id: newItem._id,
                    coords: {
                        latitude: newItem.place.lat,
                        longitude: newItem.place.lng
                    },
                    window: {
                        title: newItem.place.name
                    }
                }
                console.log(newItem);
                $scope.items.push(newItem);
            })
    };


}]);
