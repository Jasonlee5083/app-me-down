var app = angular.module("appMeDown");

app.controller("itemController", ["$scope", "$log", "$http", "$uibModal", "itemService", "mapservice", function ($scope, $log, $http, $uibModal, itemService, mapservice) {

	//	$scope.items = [];
	//
	//
	//	function createMap(config) {
	//		$scope.map = config;
	//	};
	//
	//	var config = {
	//		center: {
	//			latitude: 39.8282,
	//			longitude: -98.5795
	//		},
	//		zoom: 4
	//	};
	//	
	//	createMap(config);

	//	$scope.markers = [];
	//
	//		function setMarkers(markerInfo) {
	//			$scope.markers.push({
	//				id: $scope.markers.length + 1,
	//				coords: {
	//					latitude: markerInfo.geometry.location.lat,
	//					longitude: markerInfo.geometry.location.lng
	//				},
	//				window: {
	//					title: "location"
	//				}
	//			});
	//			console.log($scope.markers);
	//		};
	//	

	itemService.getItems().then(function (response) {
		return $scope.items = response;
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
	var modalInstance;
	$scope.showForm = function () {
		$scope.message = "Show Form Button Clicked";
		console.log($scope.message);
		modalInstance = $uibModal.open({
			templateUrl: "add-item-modal.html",
			controller: "itemModalInstanceController",
			scope: $scope,
			resolve: {
				itemForm: function () {
					return $scope.itemForm;
				}
			}
		});
	};


	modalInstance.result
		.then(function (newItem) {
			return mapservice.getMapinfo(newItem.place.name)
		})
		.then(function (mapData) {
			newItem.place.lat = mapData.results[0].geometry.location.lat;
			newItem.place.lng = mapData.results[0].geometry.location.lng;
			var config = {
				center: {
					latitude: mapData.results[0].geometry.location.lat,
					longitude: mapData.results[0].geometry.location.lng
				},
				zoom: 14
			}
			setMarkers(mapData.results[0]);
			return itemService.postItems(newItem)
		})
		.then(function (data) {
			$scope.items.push(data);
		})

	createMap(config);
	console.log(mapData);
	return mapData;


	function createMap(config) {
		$scope.map = config;
	};

	function setMarkers(markerInfo) {
		$scope.markers.push({
			id: $scope.markers.length + 1,
			coords: {
				latitude: markerInfo.geometry.location.lat,
				longitude: markerInfo.geometry.location.lng
			},
			window: {
				title: "location"
			}
		});
		console.log($scope.markers);
	};

				}]);
//			console.log($scope.markers);




// $scope.selected = newItem;
//		}, function (reason) {
//			$log.info(reason);
//		});
// map part starts

//			function createMap(config) {
//				$scope.map = config;
//			};
//
//			var config = {
//				center: {
//					latitude: 39.8282,
//					longitude: -98.5795
//				},
//				zoom: 4
//			};
//			createMap(config);
//
//			$scope.markers = [];
//
//			function setMarkers(markerInfo) {
//				$scope.markers.push({
//					id: $scope.markers.length + 1,
//					coords: {
//						latitude: markerInfo.geometry.location.lat,
//						longitude: markerInfo.geometry.location.lng
//					},
//					window: {
//						title: "location"
//					}
//				});
//				console.log($scope.markers);
//			};

//			$scope.createEvent = function (item) {
//				console.log($scope.items);
//				mapservice.getMapinfo(item.location.name).then(function (mapData) {
//						item.location.lat = mapData.results[0].geometry.location.lat;
//						item.location.lng = mapData.results[0].geometry.location.lng;
//						setMarkers(mapData.results[0]);
//
//						var config = {
//							center: {
//								latitude: mapData.results[0].geometry.location.lat,
//								longitude: mapResult.results[0].geometry.location.lng
//							},
//							zoom:14
//						}
//						createMap(config);
//						return item;
//				})

// map part ends
