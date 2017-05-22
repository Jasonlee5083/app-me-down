var app = angular.module("appMeDown");

app.directive("postModal", [function () {
	return {
		restrict: "E",
		templateUrl: "components/modals/add-item-modal.html"
	};
}]);

app.controller("itemModalInstanceController", ["$scope", "$timeout", "$uibModalInstance", "itemService", "mapService", function ($scope, $timeout, $uibModalInstance, itemService, mapService) {


	$scope.submit = function (newItem) {
		$uibModalInstance.close({newItem: newItem, images: $scope.dzMethods.getAllFiles()});
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('closed');
	};

	$scope.dzOptions = {
		url : "/api/items",
		paramName: "photo",
		maxFilesize: "10",
		addRemoveLinks : true,
        dictDefaultMessage : 'Click to add or drop photos',
        dictRemoveFile : 'Remove photo',
        dictResponseError : 'Could not upload this photo',
        autoProcessQueue : false,

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

// *Placeholder item for testing
//
// $scope.newItem = {
//     type: "Book",
//     ageRange: "1-3 years",
//     title: "Thing",
//     price: 200,
//     description: "Placeholder thing",
//     condition: "Like New",
//     place: {
//         name: "Provo"
//     },
//     email: "place@holder.com"
// };



