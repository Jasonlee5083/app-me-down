var app = angular.module("appMeDown");

app.directive("postModal", [function () {
	return {
		restrict: "E",
		templateUrl: "components/modals/add-item-modal.html"
	};
}]);

app.controller("itemModalInstanceController", ["$scope", "$timeout", "$uibModalInstance", "itemService", "mapService", function ($scope, $timeout, $uibModalInstance, itemService, mapService) {
	
//	$scope.form = {};
//	$scope.markers = [];
//	$scope.items = [];

	$scope.submit = function (newItem) {
		newItem.photos = $scope.dzMethods.getAllFiles();
		$uibModalInstance.close(newItem);
	};
	
	$scope.cancel = function () {
		$uibModalInstance.dismiss('closed');
	};
// }]);
//
//
// // ng-Dropzone
//
// app.controller('uploadController', function($scope){
	$scope.dzOptions = {
		url : "/api/items",
		paramName: "photo",
		maxFilesize: "10",
		addRemoveLinks : true,
        dictDefaultMessage : 'Click to add or drop photos',
        dictRemoveFile : 'Remove photo',
        dictResponseError : 'Could not upload this photo',
		autoProcessQueue : false
	};

	$scope.dzMethods = {};

	$scope.dzCallbacks = {
        'addedfile' : function(file){
            $scope.showBtns = true;
            $scope.lastFile = file;
        },
        'error' : function(file, xhr){
            console.warn('File failed to upload from dropzone 2.', file, xhr);
        }
	}
}]);





//var app = angular.module("appMeDown");
//
//app.controller("itemController", ["$scope", "$log", "$http", "$uibModal", "itemService", function ($scope, $log, $http, $uibModal, itemService, mapService) {
//
//	//	$scope.items = [];
//	//
//	//
//	//	function createMap(config) {
//	//		$scope.map = config;
//	//	};
//	//
//	//	var config = {
//	//		center: {
//	//			latitude: 39.8282,
//	//			longitude: -98.5795
//	//		},
//	//		zoom: 4
//	//	};
//	//	
//	//	createMap(config);
//
//	//	$scope.markers = [];
//	//
//	//		function setMarkers(markerInfo) {
//	//			$scope.markers.push({
//	//				id: $scope.markers.length + 1,
//	//				coords: {
//	//					latitude: markerInfo.geometry.location.lat,
//	//					longitude: markerInfo.geometry.location.lng
//	//				},
//	//				window: {
//	//					title: "location"
//	//				}
//	//			});
//	//			console.log($scope.markers);
//	//		};
//	//	
//
//	itemService.getItems().then(function (response) {
//		// console.log(response);
//		return $scope.items = response;
//	});
//
//
//	$scope.submit = function (newItem) {
//		itemService.postItems(newItem).then(function () {
//			$scope.items.push(newItem);
//			console.log($scope.items);
//		});
//	};
//
//	$scope.remove = function (index, id) {
//		itemService.removeItems(id).then(function (response) {
//			$scope.items.splice(index, 1);
//		});
//	};
//
//	$scope.save = function (newItem) {
//		itemService.saveItems(newItem);
//	};
//
//	$scope.showForm = function () {
//		$scope.message = "Show Form Button Clicked";
//		console.log($scope.message);
//		var modalInstance = $uibModal.open({
//			templateUrl: "add-item-modal.html",
//			controller: "itemModalInstanceController",
//			scope: $scope,
//			resolve: {
//				itemForm: function () {
//					return $scope.itemForm;
//				}
//			}
//		});
//	};
//
//
//	modalInstance.result.then(function (newItem) {
//		return mapService.getMapinfo(newItem.place.name).then(function (mapData) {
//				newItem.place.lat = mapData.results[0].geometry.location.lat;
//				newItem.place.lng = mapData.results[0].geometry.location.lng;
//				setMarkers(mapData.results[0]);
//				itemService.postItems(newItem).then(function (data) {
//						$scope.items.push(data);
//					}
//					var config = {
//						center: {
//							latitude: mapData.results[0].geometry.location.lat,
//							longitude: mapData.results[0].geometry.location.lng
//						},
//						zoom: 14
//					}
//					createMap(config); console.log(mapData);
//					return mapData;
//				})
//
//			function createMap(config) {
//				$scope.map = config;
//			};
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
//		};
//
//		//			console.log($scope.markers);
//
//	});
//
//
//
//	// $scope.selected = newItem;
//	//		}, function (reason) {
//	//			$log.info(reason);
//	//		});
//	// map part starts
//
//	//			function createMap(config) {
//	//				$scope.map = config;
//	//			};
//	//
//	//			var config = {
//	//				center: {
//	//					latitude: 39.8282,
//	//					longitude: -98.5795
//	//				},
//	//				zoom: 4
//	//			};
//	//			createMap(config);
//	//
//	//			$scope.markers = [];
//	//
//	//			function setMarkers(markerInfo) {
//	//				$scope.markers.push({
//	//					id: $scope.markers.length + 1,
//	//					coords: {
//	//						latitude: markerInfo.geometry.location.lat,
//	//						longitude: markerInfo.geometry.location.lng
//	//					},
//	//					window: {
//	//						title: "location"
//	//					}
//	//				});
//	//				console.log($scope.markers);
//	//			};
//
//	//			$scope.createEvent = function (item) {
//	//				console.log($scope.items);
//	//				mapService.getMapinfo(item.location.name).then(function (mapData) {
//	//						item.location.lat = mapData.results[0].geometry.location.lat;
//	//						item.location.lng = mapData.results[0].geometry.location.lng;
//	//						setMarkers(mapData.results[0]);
//	//
//	//						var config = {
//	//							center: {
//	//								latitude: mapData.results[0].geometry.location.lat,
//	//								longitude: mapResult.results[0].geometry.location.lng
//	//							},
//	//							zoom:14
//	//						}
//	//						createMap(config);
//	//						return item;
//	//				})
//
//	// map part ends
//
//			}]);
